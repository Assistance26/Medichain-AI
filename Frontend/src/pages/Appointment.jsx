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
  const [loading, setLoading] = useState(true); // New state to handle loading
  const { user } = useUser();

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const email = user.email;
        console.log("user email at the frontend: ", email);
        const response = await axios.get("http://localhost:5000/UserWithAppointment", {
          params: { email: email },
        });
        const data = response.data;
        console.log("appointment data:", data);

        if (data.status === "fetched") {
          setAppointment(data.appointment); // Set the single appointment data
        } else {
          setAppointment(null); // Handle no appointment found
        }
      } catch (error) {
        console.error("Error fetching appointment:", error);
      } finally {
        setLoading(false); // Set loading to false when done
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

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Your Appointment</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading appointment...</p>
      ) : !appointment ? (
        <p className="text-center text-gray-500">No booked appointment</p>
      ) : (
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
              <FaVideo /> Join
            </button>
          </div>
        </div>
      )}

      {isVideoCallActive && <VideoCall roomName={roomName} identity={identity} onClose={closeVideoCall} />}
    </div>
  );
};

export default Appointment;
