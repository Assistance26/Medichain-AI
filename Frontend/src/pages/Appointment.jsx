import React, { useState, useEffect } from "react";
import { FaVideo, FaTimes } from "react-icons/fa";
import VideoCall from "../components/VideoCall"; // Import the Twilio VideoCall component
import { useUser } from "../context/AuthContext";
import axios from "axios";

const Appointment = () => {
  const [appointment, setAppointment] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isVideoCallActive, setIsVideoCallActive] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [identity, setIdentity] = useState("");
  const [loading, setLoading] = useState(true);
  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const [appointmentToCancel, setAppointmentToCancel] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const email = user?.email;
        if (!email) return;
        console.log("User email at the frontend: ", email);

        const response = await axios.get("http://localhost:5000/UserWithAppointment", { params: { email } });
        const data = response.data;
        console.log("Appointment data:", data);

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
    const interval = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, [user]);

  const startVideoCall = async () => {
    try {
      if (!appointment || !appointment._id || !appointment.appointmentWith) {
        console.error("Missing appointment data:", appointment);
        alert("Cannot start video call: Missing appointment information");
        return;
      }
      const roomIdentifier = `${appointment._id}`;
      console.log("Room Identifier (Patient):", roomIdentifier);

      const requestData = {
        appointmentId: roomIdentifier,
        userType: user?.role || "patient",
        userName: user?.name || "Anonymous",
      };

      console.log("Sending request data:", requestData);
      const response = await axios.post("http://localhost:5000/api/token", requestData);
      if (!response.data.success) throw new Error(response.data.error || "Failed to generate token");

      console.log("✅ Token response:", response.data);
      const { token, roomName, identity } = response.data;

      setRoomName(roomName);
      setIdentity(identity);
      setIsVideoCallActive(true);
    } catch (error) {
      console.error("❌ Error starting video call:", error);
      alert(error.response?.data?.error || "Failed to start video call. Please try again.");
    }
  };

  const closeVideoCall = () => setIsVideoCallActive(false);

  const handleCancelAppointment = async () => {
    if (!appointmentToCancel) return;

    try {
      await axios.post(`http://localhost:5000/cancelAppointment/${appointmentToCancel}`);
      setAppointment(null);
    } catch (error) {
      console.error("Error canceling appointment:", error);
    } finally {
      setShowCancelPopup(false);
      setAppointmentToCancel(null);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Your Appointment Details</h2>
      
      {loading ? (
        <p className="text-center text-gray-500">Loading appointments...</p>
      ) : !appointment ? (
        <p className="text-center text-gray-500">No booked appointments</p>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-5 bg-white shadow-lg rounded-xl border border-gray-200">
            <div>
              <h3 className="text-lg font-semibold">Doctor: {appointment.appointmentWith}</h3>
              <p className="text-sm text-gray-500"><b>Scheduled On:</b> {appointment.appointmentAt}</p>
              <p className="text-sm text-gray-600"><b>Time Slot:</b> {appointment.timeSlot}</p>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={startVideoCall} 
                className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                <FaVideo /> Join Call
              </button>
              <button 
                onClick={() => {
                  setAppointmentToCancel(appointment._id);
                  setShowCancelPopup(true);
                }} 
                className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                <FaTimes /> Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showCancelPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-lg font-semibold mb-4">Cancel Appointment?</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to cancel this appointment?</p>
            <div className="flex justify-center gap-4">
              <button 
                onClick={handleCancelAppointment} 
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
