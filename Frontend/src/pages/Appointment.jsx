// import React, { useState, useEffect } from "react";
// import { FaVideo } from "react-icons/fa";
// import VideoCall from "../components/VideoCall"; // Import the Twilio VideoCall component
// import { useUser } from "../context/AuthContext";
// import axios from "axios";

// const Appointment = () => {
//   const [appointment, setAppointment] = useState(null);
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const [isVideoCallActive, setIsVideoCallActive] = useState(false);
//   const [roomName, setRoomName] = useState("");
//   const [identity, setIdentity] = useState("");
//   const [loading, setLoading] = useState(true); // State to handle loading
//   const { user } = useUser(); // Get user details with role (patient/doctor)

//   // ✅ Fetch Appointment Details
//   useEffect(() => {
//     const fetchAppointment = async () => {
//       try {
//         const email = user.email;
//         console.log("User email at the frontend: ", email);
//         const response = await axios.get(
//           "http://localhost:5000/UserWithAppointment",
//           { params: { email: email } }
//         );
//         const data = response.data;
//         console.log("Appointment data:", data);

//         if (data.status === "fetched") {
//           setAppointment(data.appointment); // Set the appointment data
//         } else {
//           setAppointment(null); // Handle no appointment found
//         }
//       } catch (error) {
//         console.error("Error fetching appointment:", error);
//       } finally {
//         setLoading(false); // Set loading to false after fetching
//       }
//     };

//     fetchAppointment();

//     const interval = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 60000);

//     return () => clearInterval(interval);
//   }, [user]);

//   const startVideoCall = async () => {
//     try {
//       // ✅ Corrected condition
//       if (
//         !appointment ||
//         !appointment._id || // Use _id correctly
//         !appointment.appointmentWith // Check for required appointment data
//       ) {
//         console.error("Missing appointment data:", appointment);
//         alert("Cannot start video call: Missing appointment information");
//         return;
//       }
  
//       // ✅ Use consistent _id as room identifier
//       const roomIdentifier = `${appointment._id}`; // Corrected usage
  
//       console.log("Room Identifier (Patient):", roomIdentifier);
  
//       // ✅ Prepare request data
//       const requestData = {
//         appointmentId: roomIdentifier, // Consistent ID
//         userType: user.role || "patient",
//         userName: user.name,
//       };
  
//       console.log("Sending request data:", requestData);
  
//       // ✅ Generate token from backend
//       const response = await axios.post(
//         "http://localhost:5000/api/token",
//         requestData
//       );
  
//       if (!response.data.success) {
//         throw new Error(response.data.error || "Failed to generate token");
//       }
  
//       console.log("✅ Token response:", response.data);
  
//       const { token, roomName, identity } = response.data;
  
//       // ✅ Set video call details correctly
//       setRoomName(roomName);
//       setIdentity(identity);
//       setIsVideoCallActive(true);
//     } catch (error) {
//       console.error("❌ Error starting video call:", error);
//       alert(
//         error.response?.data?.error || "Failed to start video call. Please try again."
//       );
//     }
//   };
  
//   // ✅ Close Video Call
//   const closeVideoCall = () => {
//     setIsVideoCallActive(false);
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//   <h2 className="text-2xl font-bold mb-6 text-center">Your Appointments</h2>

//   {loading ? (
//     <p className="text-center text-gray-500">Loading appointments...</p>
//   ) : !appointment || !appointment.appointmentAt?.length ? (
//     <p className="text-center text-gray-500">No booked appointments</p>
//   ) : (
//     <div className="space-y-4">
//       {appointment.appointmentAt.map((date, index) => (
//         <div
//           key={index}
//           className="flex items-center justify-between p-5 bg-white shadow-lg rounded-xl border border-gray-200"
//         >
//           <div>
//             <h3 className="text-lg font-semibold">
//               Doctor: {appointment.appointmentWith?.[index] || "N/A"}
//             </h3>
//             <p className="text-sm text-gray-500">
//               <b>Scheduled On:</b>{" "}
//               {date ? new Date(date).toLocaleDateString() : "Not Set"}
//             </p>
//             <p className="text-sm text-gray-600">
//               <b>Time Slot:</b> {appointment.timeSlot?.[index] || "Not Set"}
//             </p>
//           </div>

//           <div className="flex items-center gap-4">
//             <button
//               onClick={() => startVideoCall(index)}
//               className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
//             >
//               <FaVideo /> Join
//             </button>

//             <button
//               onClick={() => setShowCancelPopup(index)}
//               className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
//             >
//               <FaTimes /> Cancel
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   )}

//   {/* Cancel Confirmation Popup */}
//   {showCancelPopup !== false && (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg text-center">
//         <h3 className="text-lg font-semibold mb-4">Cancel Appointment?</h3>
//         <p className="text-gray-600 mb-6">
//           Are you sure you want to cancel this appointment?
//         </p>
//         <div className="flex justify-center gap-4">
//           <button
//             onClick={() => handleCancelAppointment(showCancelPopup)}
//             className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
//           >
//             Yes, Cancel
//           </button>
//           <button
//             onClick={() => setShowCancelPopup(false)}
//             className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
//           >
//             No, Keep It
//           </button>
//         </div>
//       </div>
//     </div>
//   )}

//   {isVideoCallActive && <VideoCall roomName={roomName} identity={identity} onClose={closeVideoCall} />}
// </div>

//   );
// };

// export default Appointment;


import React, { useState, useEffect } from "react";
import { FaVideo, FaTimes } from "react-icons/fa";
import VideoCall from "../components/VideoCall";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const Appointment = () => {
  const [appointment, setAppointment] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isVideoCallActive, setIsVideoCallActive] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [identity, setIdentity] = useState("");
  const [loading, setLoading] = useState(true);
  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const email = user.email;
        console.log("User email at the frontend: ", email);
        const response = await axios.get("http://localhost:5000/UserWithAppointment", {
          params: { email: email },
        });

        const data = response.data;
        console.log("Appointment data:", data.appointment);

        if (data.status === "fetched") {
          setAppointment(data.appointment);
        } else {
          setAppointment(null);
        }
      } catch (error) {
        console.error("Error fetching appointment:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointment();

    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, [user]);

  const startVideoCall = () => {
    setIdentity(appointment.appointmentWith);
    setRoomName(`room_${appointment._id}`);
    setIsVideoCallActive(true);
  };

  const closeVideoCall = () => {
    setIsVideoCallActive(false);
  };

  const handleCancelAppointment = async () => {
    setAppointment(null);
    setShowCancelPopup(false);
    try {
      await axios.post(`http://localhost:5000/cancelAppointment/${appointment._id}`);
      
      
    } catch (error) {
      console.error("Error canceling appointment:", error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
  <h2 className="text-2xl font-bold mb-6 text-center">Your Appointments</h2>

  {loading ? (
    <p className="text-center text-gray-500">Loading appointments...</p>
  ) : !appointment || !appointment.appointmentAt?.length ? (
    <p className="text-center text-gray-500">No booked appointments</p>
  ) : (
    <div className="space-y-4">
      {appointment.appointmentAt.map((date, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-5 bg-white shadow-lg rounded-xl border border-gray-200"
        >
          <div>
            <h3 className="text-lg font-semibold">
              Doctor: {appointment.appointmentWith?.[index] || "N/A"}
            </h3>
            <p className="text-sm text-gray-500">
              <b>Scheduled On:</b>{" "}
              {date ? new Date(date).toLocaleDateString() : "Not Set"}
            </p>
            <p className="text-sm text-gray-600">
              <b>Time Slot:</b> {appointment.timeSlot?.[index] || "Not Set"}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => startVideoCall(index)}
              className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              <FaVideo /> Join
            </button>

            <button
              onClick={() => setShowCancelPopup(index)}
              className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              <FaTimes /> Cancel
            </button>
          </div>
        </div>
      ))}
    </div>
  )}

  {/* Cancel Confirmation Popup */}
  {showCancelPopup !== false && (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h3 className="text-lg font-semibold mb-4">Cancel Appointment?</h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to cancel this appointment?
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => handleCancelAppointment(showCancelPopup)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Yes, Cancel
          </button>
          <button
            onClick={() => setShowCancelPopup(false)}
            className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
          >
            No, Keep It
          </button>
        </div>
      </div>
    </div>
  )}

  {isVideoCallActive && <VideoCall roomName={roomName} identity={identity} onClose={closeVideoCall} />}
</div>

  );
};

export default Appointment;