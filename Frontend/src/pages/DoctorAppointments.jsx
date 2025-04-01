import { useEffect, useState, useContext } from "react";
import { ChatbotContext } from "../context/ChatbotContext";
import { FaVideo } from "react-icons/fa";
import VideoCall from "../components/VideoCall"; // Assuming you have a VideoCall component

const DoctorAppointments = () => {
  const { doctorAppointments } = useContext(ChatbotContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVideoCallActive, setIsVideoCallActive] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [patientName, setPatientName] = useState("");
  const [identity, setIdentity] = useState(""); // Add identity state

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        if (!doctorAppointments || !Array.isArray(doctorAppointments.appointmentAt)) {
          setError("No valid appointment data available.");
          return;
        }

        console.log("Upcoming Appointments:", doctorAppointments);

        // Transforming the data
        const structuredAppointments = doctorAppointments.appointmentAt.map((date, index) => ({
          id: index, // Unique key
          patient: doctorAppointments.appointmentWith?.[index] || "Unknown Patient",
          date,
          time: doctorAppointments.timeSlot?.[index] || "Time Not Set",
        }));
        console.log("appoint dtaa at docrtor:",structuredAppointments);
        
        setAppointments(structuredAppointments);
      } catch (error) {
        setError("Error processing appointments.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [doctorAppointments]);

  const startVideoCall = (patientName) => {
    // Set the room name and patient info for the video call
    const room = `room_${patientName}`; // Unique room name for each appointment
    setRoomName(room);
    setPatientName(patientName);
    setIdentity(`Dr_${doctorAppointments.name}`); // Assuming doctor name is available in doctorAppointments
    console.log("Room Name Set:", room);
    console.log("Identity Set:", `Dr_${doctorAppointments.name}`);
    setIsVideoCallActive(true); // Activate video call view
  };

  const closeVideoCall = () => {
    setIsVideoCallActive(false);
    setRoomName("");
    setPatientName("");
    setIdentity(""); // Reset identity when closing video call
    console.log("Video Call Closed");
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Upcoming Appointments</h2>

      {loading ? (
        <p className="text-gray-500">Loading appointments...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : appointments.length > 0 ? (
        <ul className="space-y-3">
          {appointments.map((appt) => (
            <li key={appt.id} className="p-3 border rounded shadow-sm">
              <p><strong>Patient:</strong> {appt.patient}</p>
              <p><strong>Date:</strong> {appt.date}</p>
              <p><strong>Time:</strong> {appt.time}</p>
              <button
                onClick={() => startVideoCall(appt.patient)}
                className="mt-2 flex items-center gap-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
              >
                <FaVideo /> Start Video Call
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No upcoming appointments.</p>
      )}

      {/* Video Call Component */}
      {isVideoCallActive && (
        <VideoCall
          roomName={roomName}
          identity={identity} // Pass the identity prop
          onClose={closeVideoCall}
        />
      )}
    </div>
  );
};

export default DoctorAppointments;