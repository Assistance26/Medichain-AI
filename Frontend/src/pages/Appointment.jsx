import React, { useState, useEffect } from "react";
import { FaVideo } from "react-icons/fa";
import VideoCall from "../components/VideoCall"; // Import the Twilio VideoCall component
import { useUser } from "../context/AuthContext";
import axios from "axios";

const Appointment = () => {
  const [appointment, setAppointment] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isVideoCallActive, setIsVideoCallActive] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [identity, setIdentity] = useState("");
  const [loading, setLoading] = useState(true); // State to handle loading
  const { user } = useUser(); // Get user details with role (patient/doctor)

  // ✅ Fetch Appointment Details
  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const email = user.email;
        console.log("User email at the frontend: ", email);
        const response = await axios.get(
          "http://localhost:5000/UserWithAppointment",
          { params: { email: email } }
        );
        const data = response.data;
        console.log("Appointment data:", data);

        if (data.status === "fetched") {
          setAppointment(data.appointment); // Set the appointment data
        } else {
          setAppointment(null); // Handle no appointment found
        }
      } catch (error) {
        console.error("Error fetching appointment:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchAppointment();

    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, [user]);

  const startVideoCall = async () => {
    try {
      // ✅ Corrected condition
      if (
        !appointment ||
        !appointment._id || // Use _id correctly
        !appointment.appointmentWith // Check for required appointment data
      ) {
        console.error("Missing appointment data:", appointment);
        alert("Cannot start video call: Missing appointment information");
        return;
      }
  
      // ✅ Use consistent _id as room identifier
      const roomIdentifier = `${appointment._id}`; // Corrected usage
  
      console.log("Room Identifier (Patient):", roomIdentifier);
  
      // ✅ Prepare request data
      const requestData = {
        appointmentId: roomIdentifier, // Consistent ID
        userType: user.role || "patient",
        userName: user.name,
      };
  
      console.log("Sending request data:", requestData);
  
      // ✅ Generate token from backend
      const response = await axios.post(
        "http://localhost:5000/api/token",
        requestData
      );
  
      if (!response.data.success) {
        throw new Error(response.data.error || "Failed to generate token");
      }
  
      console.log("✅ Token response:", response.data);
  
      const { token, roomName, identity } = response.data;
  
      // ✅ Set video call details correctly
      setRoomName(roomName);
      setIdentity(identity);
      setIsVideoCallActive(true);
    } catch (error) {
      console.error("❌ Error starting video call:", error);
      alert(
        error.response?.data?.error || "Failed to start video call. Please try again."
      );
    }
  };
  
  // ✅ Close Video Call
  const closeVideoCall = () => {
    setIsVideoCallActive(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Your Appointment Details
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading appointment...</p>
      ) : !appointment ? (
        <p className="text-center text-gray-500">No booked appointment</p>
      ) : (
        <div className="flex items-center justify-between p-5 bg-white shadow-lg rounded-xl border border-gray-200">
          <div>
            <h3 className="text-lg font-semibold">
              Doctor: {appointment.appointmentWith}
            </h3>
            <p className="text-sm text-gray-500">
              <b>Scheduled On:</b> {appointment.appointmentAt}
            </p>
            <p className="text-sm text-gray-600">
              <b>Time Slot:</b> {appointment.timeSlot}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={startVideoCall}
              className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              <FaVideo /> Join Call
            </button>
          </div>
        </div>
      )}

      {isVideoCallActive && (
        <VideoCall
          roomName={roomName}
          identity={identity}
          onClose={closeVideoCall}
        />
      )}
    </div>
  );
};

export default Appointment;