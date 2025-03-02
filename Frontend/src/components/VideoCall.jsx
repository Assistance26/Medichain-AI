import React, { useState, useEffect, useRef } from "react";
import { connect } from "twilio-video";
import { motion } from "framer-motion";
import { FiMic, FiMicOff } from "react-icons/fi";

const VideoCall = () => {
  const [roomName, setRoomName] = useState("");
  const [identity, setIdentity] = useState("");
  const [room, setRoom] = useState(null);
  const [isMicOn, setIsMicOn] = useState(true);
  const videoRef = useRef(null);

  // Fetch Twilio token from backend
  const getToken = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identity, room: roomName }),
      });

      const data = await response.json();
      return data.token || null;
    } catch (error) {
      console.error("Error fetching token:", error);
      return null;
    }
  };

  // Join Room
  const joinRoom = async () => {
    if (!identity || !roomName) {
      alert("Please enter Identity & Room Name!");
      return;
    }
    try {
      const token = await getToken();
      if (!token) return;
      
      const newRoom = await connect(token, { name: roomName });
      setRoom(newRoom);
      console.log("Joined room:", roomName);

      newRoom.localParticipant.tracks.forEach((publication) => {
        if (publication.track) {
          videoRef.current.appendChild(publication.track.attach());
        }
      });

      newRoom.on("participantConnected", (participant) => {
        participant.tracks.forEach((publication) => {
          if (publication.track) {
            videoRef.current.appendChild(publication.track.attach());
          }
        });
      });

      newRoom.on("participantDisconnected", (participant) => {
        console.log(`${participant.identity} left.`);
      });

      newRoom.on("disconnected", () => {
        setRoom(null);
      });
    } catch (error) {
      console.error("Error joining room:", error);
    }
  };

  // Leave Room
  const leaveRoom = () => {
    if (room) {
      room.disconnect();
      setRoom(null);
    }
  };

  // Toggle Microphone
  const toggleMic = () => {
    setIsMicOn((prev) => !prev);
  };

  useEffect(() => {
    return () => {
      if (room) {
        room.disconnect();
      }
    };
  }, [room]);

  return (
    <div className="flex flex-col items-center p-6 min-h-screen bg-gradient-to-br from-blue-900 via-purple-800 to-black">
      <motion.h2 
        className="text-4xl font-extrabold mb-6 text-white shadow-lg"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        🎥 Twilio Video Call
      </motion.h2>

      <motion.input
        className="border p-3 m-2 rounded-lg bg-white/20 backdrop-blur-md shadow-xl text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-400"
        type="text"
        placeholder="Enter Identity"
        value={identity}
        onChange={(e) => setIdentity(e.target.value)}
        whileFocus={{ scale: 1.05 }}
      />

      <motion.input
        className="border p-3 m-2 rounded-lg bg-white/20 backdrop-blur-md shadow-xl text-white placeholder-gray-300 focus:ring-2 focus:ring-green-400"
        type="text"
        placeholder="Enter Room Name"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        whileFocus={{ scale: 1.05 }}
      />

      {!room ? (
        <motion.button
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg mt-4 shadow-xl hover:shadow-blue-500/50 transition-transform transform hover:scale-105 active:scale-95"
          onClick={joinRoom}
        >
          🎥 Join Room
        </motion.button>
      ) : (
        <motion.button
          className="bg-red-500 text-white px-6 py-3 rounded-lg mt-4 shadow-xl hover:shadow-red-500/50 transition-transform transform hover:scale-105 active:scale-95"
          onClick={leaveRoom}
        >
          🚪 Leave Room
        </motion.button>
      )}

      {/* Toggle Mic Button */}
      {room && (
        <motion.button
          className={`mt-4 flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg ${
            isMicOn ? "bg-green-500" : "bg-gray-500"
          } text-white transition-all hover:scale-105`}
          onClick={toggleMic}
        >
          {isMicOn ? <FiMic size={24} /> : <FiMicOff size={24} />}
          {isMicOn ? "Microphone On" : "Microphone Off"}
        </motion.button>
      )}

      {/* Video Container */}
      <motion.div
        className="w-full max-w-2xl mt-6 border p-4 bg-white/10 backdrop-blur-md rounded-lg shadow-2xl text-white"
        ref={videoRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {room ? (
          <p className="text-green-300 text-lg font-semibold">
            ✅ Connected to Room: {roomName}
          </p>
        ) : (
          <p className="text-red-300 text-lg font-semibold">
            ❌ Not in a Room
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default VideoCall;
