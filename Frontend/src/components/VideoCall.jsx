// import React, { useState, useEffect, useRef } from "react";
// import { connect } from "twilio-video";
// import { motion } from "framer-motion";
// import { FiMic, FiMicOff } from "react-icons/fi";

// const VideoCall = ({ roomName, identity, onClose }) => {
//   const [room, setRoom] = useState(null);
//   const [isMicOn, setIsMicOn] = useState(true);
//   const videoRef = useRef(null);

//   // 🔥 Fetch Twilio token from backend
//   const getToken = async () => {
//     try {
//       console.log("Token Request Data:", {
//         appointmentId: roomName,
//         userType: identity.includes("Dr_") ? "doctor" : "patient",
//         userName: Array.isArray(identity) ? identity.join("_") : identity.replace("Dr_", ""),
//       });

      
//       const response = await fetch('http://localhost:5000/api/token', {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           appointmentId: roomName,
//           userType: identity.includes("Dr_") ? "doctor" : "patient",
//           userName: Array.isArray(identity) ? identity.join("_") : identity.replace("Dr_", ""),
//         }),
//       });
//       // Parse response and extract token
//       const data = await response.json();
//       console.log("Backend Response:", data);
//       if (!data.success || !data.token) {
//         throw new Error(data.error || "Failed to get token");
//       }
//       console.log("Token Generation Request:", {
//         appointmentId: roomName,
//         userType: identity.includes("Dr_") ? "doctor" : "patient",
//         userName: Array.isArray(identity) ? identity.join("_") : identity.replace("Dr_", ""),
//       });
//       console.log("Generated Token:", data.token);
//       return data.token;
//     } catch (error) {
//       console.error("Error fetching token:", error);
//       return null;
//     }
//   };

//   // 🎥 Join Room Automatically
//   const joinRoom = async () => {
//     if (!roomName || !identity) {
//       console.error("Missing roomName or identity");
//       return;
//     }

//     try {
//       const token = await getToken();
//       if (!token) {
//         alert("Failed to join the room. Please try again.");
//         return;
//       }

//       const newRoom = await connect(token, { name: roomName });
//       setRoom(newRoom);
//       console.log(`✅ Joined room: ${roomName}`);

//       // 🎥 Attach local tracks to the video container
//       newRoom.localParticipant.tracks.forEach((publication) => {
//         if (publication.track) {
//           videoRef.current.appendChild(publication.track.attach());
//         }
//       });

//       // 🎥 Attach remote tracks when participant joins
//       newRoom.on("participantConnected", (participant) => {
//         console.log(`${participant.identity} joined`);
//         participant.tracks.forEach((publication) => {
//           if (publication.track) {
//             videoRef.current.appendChild(publication.track.attach());
//           }
//         });
//       });

//       // ❌ Handle participant disconnection
//       newRoom.on("participantDisconnected", (participant) => {
//         console.log(`${participant.identity} left.`);
//         participant.tracks.forEach((publication) => {
//           if (publication.track) {
//             publication.track.detach().forEach((element) => element.remove());
//           }
//         });
//       });

//       // 🔌 Handle disconnection
//       newRoom.on("disconnected", () => {
//         console.log("Room disconnected.");
//         setRoom(null);
//         onClose(); // Notify parent to close video call
//       });
//     } catch (error) {
//       console.error("Error joining room:", error);
//     }
//   };

//   // 🚪 Leave Room
//   const leaveRoom = () => {
//     if (room) {
//       room.disconnect();
//       setRoom(null);
//       onClose(); // Notify parent to close video call
//     }
//   };

//   // 🎤 Toggle Microphone
//   const toggleMic = () => {
//     if (room) {
//       room.localParticipant.audioTracks.forEach((publication) => {
//         if (publication.track) {
//           if (isMicOn) {
//             publication.track.disable();
//           } else {
//             publication.track.enable();
//           }
//         }
//       });
//       setIsMicOn((prev) => !prev);
//     }
//   };

//   // 🔥 Auto-Join Room on Mount
//   useEffect(() => {
//     joinRoom();
//     return () => {
//       if (room) {
//         room.disconnect();
//       }
//     };
//   }, [roomName, identity]);

//   return (
//     <div className="flex flex-col items-center p-6 min-h-screen bg-gradient-to-br from-blue-900 via-purple-800 to-black">
//       <motion.h2
//         className="text-4xl font-extrabold mb-6 text-white shadow-lg"
//         initial={{ opacity: 0, y: -10 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         🎥 Video Call - {identity}
//       </motion.h2>

//       {/* Leave Room Button */}
//       {room && (
//         <motion.button
//           className="bg-red-500 text-white px-6 py-3 rounded-lg mt-4 shadow-xl hover:shadow-red-500/50 transition-transform transform hover:scale-105 active:scale-95"
//           onClick={leaveRoom}
//         >
//           🚪 Leave Room
//         </motion.button>
//       )}

//       {/* Toggle Microphone */}
//       {room && (
//         <motion.button
//           className={`mt-4 flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg ${
//             isMicOn ? "bg-green-500" : "bg-gray-500"
//           } text-white transition-all hover:scale-105`}
//           onClick={toggleMic}
//         >
//           {isMicOn ? <FiMic size={24} /> : <FiMicOff size={24} />}
//           {isMicOn ? "Microphone On" : "Microphone Off"}
//         </motion.button>
//       )}

//       {/* Video Container */}
//       <motion.div
//         className="w-full max-w-2xl mt-6 border p-4 bg-white/10 backdrop-blur-md rounded-lg shadow-2xl text-white"
//         ref={videoRef}
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         {room ? (
//           <p className="text-green-300 text-lg font-semibold">
//             ✅ Connected to Room: {roomName}
//           </p>
//         ) : (
//           <p className="text-red-300 text-lg font-semibold">❌ Not in a Room</p>
//         )}
//       </motion.div>
//     </div>
//   );
// };

// export default VideoCall;



import React, { useState, useEffect, useRef } from "react";
import { connect } from "twilio-video";
import { motion } from "framer-motion";
import { FiMic, FiMicOff } from "react-icons/fi";
import { BsDoorOpenFill } from "react-icons/bs";

const VideoCall = ({ roomName, identity, onClose }) => {
  const [room, setRoom] = useState(null);
  const [isMicOn, setIsMicOn] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const videoRef = useRef(null);

  // 🔥 Fetch Twilio token from backend
  const getToken = async () => {
    try {
      console.log("Token Request Data:", {
        appointmentId: roomName,
        userType: identity.includes("Dr_") ? "doctor" : "patient",
        userName: Array.isArray(identity) ? identity.join("_") : identity.replace("Dr_", ""),
      });

      const response = await fetch("http://localhost:5000/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appointmentId: roomName,
          userType: identity.includes("Dr_") ? "doctor" : "patient",
          userName: Array.isArray(identity) ? identity.join("_") : identity.replace("Dr_", ""),
        }),
      });

      // Parse response and extract token
      const data = await response.json();
      console.log("Backend Response:", data);
      if (!data.success || !data.token) {
        throw new Error(data.error || "Failed to get token");
      }
      console.log("Generated Token:", data.token);
      return data.token;
    } catch (error) {
      console.error("Error fetching token:", error);
      return null;
    }
  };

  // 🎥 Join Room Automatically
  const joinRoom = async () => {
    if (!roomName || !identity) {
      console.error("Missing roomName or identity");
      return;
    }

    try {
      const token = await getToken();
      if (!token) {
        alert("Failed to join the room. Please try again.");
        return;
      }

      const newRoom = await connect(token, { name: roomName });
      setRoom(newRoom);
      console.log(`✅ Joined room: ${roomName}`);

      // 🎥 Attach local tracks to the video container
      newRoom.localParticipant.tracks.forEach((publication) => {
        if (publication.track) {
          videoRef.current.appendChild(publication.track.attach());
        }
      });

      // 🎥 Attach remote tracks when participant joins
      newRoom.on("participantConnected", (participant) => {
        addNotification(`${participant.identity} joined the room.`, "success");
        participant.tracks.forEach((publication) => {
          if (publication.track) {
            videoRef.current.appendChild(publication.track.attach());
          }
        });
      });

      // ❌ Handle participant disconnection
      newRoom.on("participantDisconnected", (participant) => {
        addNotification(`${participant.identity} left the room.`, "danger");
        participant.tracks.forEach((publication) => {
          if (publication.track) {
            publication.track.detach().forEach((element) => element.remove());
          }
        });
      });

      // 🔌 Handle disconnection
      newRoom.on("disconnected", () => {
        console.log("Room disconnected.");
        setRoom(null);
        onClose(); // Notify parent to close video call
      });
    } catch (error) {
      console.error("Error joining room:", error);
    }
  };

  // 🚪 Leave Room
  const leaveRoom = () => {
    if (room) {
      room.disconnect();
      setRoom(null);
      onClose(); // Notify parent to close video call
    }
  };

  // 🎤 Toggle Microphone
  const toggleMic = () => {
    if (room) {
      room.localParticipant.audioTracks.forEach((publication) => {
        if (publication.track) {
          isMicOn ? publication.track.disable() : publication.track.enable();
        }
      });
      setIsMicOn((prev) => !prev);
    }
  };

  // 🚀 Auto-Join Room on Mount
  useEffect(() => {
    joinRoom();
    return () => {
      if (room) {
        room.disconnect();
      }
    };
  }, [roomName, identity]);

  // 🎉 Add Notification
  const addNotification = (message, type) => {
    const id = Date.now();
    setNotifications((prev) => [
      ...prev,
      { id, message, type },
    ]);

    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 3000);
  };

  return (
    <div className="relative flex flex-col items-center p-6 min-h-screen bg-gradient-to-br from-blue-900 via-purple-800 to-black overflow-hidden">
      {/* 🌌 Floating Particles Effect */}
      <div className="absolute inset-0 pointer-events-none animate-pulse">
        <div className="w-full h-full bg-gradient-to-br from-indigo-500/10 via-pink-500/10 to-blue-900/20 blur-2xl"></div>
      </div>

      {/* 🎥 Title */}
      <motion.h2
        className="text-4xl font-extrabold mb-6 text-white shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* 🎥 Video Call - {identity} */}
        🎥 Video Call
      </motion.h2>

      {/* 🚪 Leave Room Button */}
      {room && (
        <motion.button
          className="bg-red-500 text-white px-6 py-3 rounded-lg mt-4 shadow-xl hover:bg-red-600 hover:scale-105 transition-transform transform active:scale-95"
          onClick={leaveRoom}
          whileTap={{ scale: 0.95 }}
        >
          <BsDoorOpenFill className="inline-block mr-2" /> Leave Room
        </motion.button>
      )}

      {/* 🎤 Toggle Microphone */}
      {room && (
        <motion.button
          className={`mt-4 flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg ${
            isMicOn ? "bg-green-500" : "bg-gray-500"
          } text-white transition-all hover:scale-105`}
          onClick={toggleMic}
          whileTap={{ scale: 0.95 }}
        >
          {isMicOn ? <FiMic size={24} /> : <FiMicOff size={24} />}
          {isMicOn ? "Microphone On" : "Microphone Off"}
        </motion.button>
      )}

      {/* 🎥 Video Container */}
      <motion.div
        className="w-full max-w-2xl mt-6 border p-4 bg-white/10 backdrop-blur-md rounded-lg shadow-2xl text-white transition-all hover:shadow-purple-500/50"
        ref={videoRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        {room ? (
          <p className="text-green-300 text-lg font-semibold animate-pulse">
            ✅ Connected to Room: {roomName}
          </p>
        ) : (
          <p className="text-red-300 text-lg font-semibold">❌ Not in a Room</p>
        )}
      </motion.div>

      {/* 🎉 Notifications */}
      <div className="absolute top-4 right-4 space-y-2">
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={`px-4 py-2 rounded-lg text-white shadow-md ${
              notification.type === "success"
                ? "bg-green-500"
                : "bg-red-500"
            }`}
          >
            {notification.message}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default VideoCall;
