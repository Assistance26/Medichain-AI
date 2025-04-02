
import { motion } from "framer-motion";
import { useEffect, useState, useContext } from "react";
import { ChatbotContext } from "../context/ChatbotContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaVideo } from "react-icons/fa"; // For video call button icon
import VideoCall from "../components/VideoCall"; // Import the VideoCall component

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const { doctorAppointments, setDoctorAppointments, doctorState, setDoctorState } = useContext(ChatbotContext);

  const [appointments, setAppointments] = useState([]);
  const [isVideoCallActive, setIsVideoCallActive] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [identity, setIdentity] = useState("");

  // Ensure doctorState persists
  useEffect(() => {
    const storedDoctor = localStorage.getItem("doctorState");

    if (!doctorState && storedDoctor) {
      setDoctorState(JSON.parse(storedDoctor));
    }

    if (!doctorState && !storedDoctor) {
      navigate("/login"); // Redirect if no doctor data is found
    }
  }, [doctorState, navigate, setDoctorState]);

  // Fetch Appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      if (!doctorState?.name) return;

      try {
        const res = await axios.get("http://localhost:5000/fetchDates", {
          params: { name: doctorState.name },
        });

        if (res.data.status === "fetched" && res.data.dates) {
          console.log("Fetched Appointments:", res.data.dates);

          setDoctorAppointments({
            appointmentWith: res.data.dates.appointmentWith,
            appointmentAt: res.data.dates.appointmentAt,
            timeSlot: res.data.dates.timeSlot,
          });
        } else {
          console.log("No appointments found.");
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, [doctorState, setDoctorAppointments]);

  // Start Video Call
  const startVideoCall = (appointmentId, patientName) => {
    setIdentity(doctorState.name);
    setRoomName(`room_${appointmentId},${patientName}`); // Unique room name for each appointment
    setIsVideoCallActive(true);
  };

  // Close Video Call
  const closeVideoCall = () => {
    setIsVideoCallActive(false);
  };

  return (
    <div className="container mx-auto p-6 flex justify-center">
      <motion.div
        className="max-w-5xl w-full bg-white shadow-xl rounded-2xl p-8 border border-gray-200 flex flex-col items-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {!doctorState ? (
          <h2 className="text-2xl font-bold text-red-600">Loading Doctor Data...</h2>
        ) : (
          <>
            {/* Doctor Details */}
            <h2 className="text-4xl font-bold text-blue-600">{doctorState.name}</h2>
            <p className="text-xl text-gray-500 mb-6">{doctorState.specialization || "Specialization N/A"}</p>

            {/* Doctor Info Table */}
            <div className="w-full mb-6">
              {[
                { label: "📧 Email", value: doctorState.email },
                { label: "📞 Phone", value: doctorState.number },
                { label: "🔢 License Number", value: doctorState.licenseNumber },
                { label: "🏆 Experience", value: `${doctorState.Experience} years` },
                { label: "📚 Publications", value: doctorState.publications },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between border-b border-gray-300 py-3 text-lg"
                >
                  <span className="font-semibold text-gray-700">{item.label}:</span>
                  <span className="text-gray-900">{item.value || "N/A"}</span>
                </div>
              ))}
            </div>

            {/* Appointments Section */}
            
          </>
        )}
      </motion.div>

      {/* Video Call Component */}
      {isVideoCallActive && <VideoCall roomName={roomName} identity={identity} onClose={closeVideoCall} />}
    </div>
  );
};

export default DoctorDashboard;


