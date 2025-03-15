import React, { useState, useEffect } from "react";
import { FaVideo, FaTimes } from "react-icons/fa";
import VideoCall from "../components/VideoCall"; // Import the Twilio VideoCall component

const Appointment = () => {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      doctorName: "Dr. John Doe",
      specialization: "Cardiologist",
      date: "2025-03-10",
      time: "10:30 AM",
      status: "Upcoming",
    },
    {
      id: 2,
      doctorName: "Dr. Jane Smith",
      specialization: "Dermatologist",
      date: "2025-03-12",
      time: "2:00 PM",
      status: "Upcoming",
    },
  ]);

  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isVideoCallActive, setIsVideoCallActive] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [identity, setIdentity] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const startVideoCall = (appointment) => {
    setIdentity(appointment.doctorName);
    setRoomName(`room_${appointment.id}`);
    setIsVideoCallActive(true);
  };

  const closeVideoCall = () => {
    setIsVideoCallActive(false);
  };

  const openCancelPopup = (appointment) => {
    setSelectedAppointment(appointment);
  };

  const closeCancelPopup = () => {
    setSelectedAppointment(null);
  };

  const handleCancel = () => {
    setAppointments(appointments.filter((appt) => appt.id !== selectedAppointment.id));
    closeCancelPopup();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Your Appointments</h2>
      {appointments.length === 0 ? (
        <p className="text-center text-gray-500">No booked appointments</p>
      ) : (
        <div className="space-y-6">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex items-center justify-between p-5 bg-white shadow-lg rounded-xl border border-gray-200"
            >
              <div>
                <h3 className="text-lg font-semibold">{appointment.doctorName}</h3>
                <p className="text-sm text-gray-500">{appointment.specialization}</p>
                <p className="text-sm text-gray-600">
                  {appointment.date} at {appointment.time}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${appointment.status === "Upcoming" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                  {appointment.status}
                </span>

                <button
                  onClick={() => startVideoCall(appointment)}
                  className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  <FaVideo /> Join
                </button>

                <button
                  onClick={() => openCancelPopup(appointment)}
                  className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  <FaTimes /> Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedAppointment && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
            <h3 className="text-lg font-semibold mb-4">Cancel Appointment</h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to cancel your appointment with {" "}
              <span className="font-semibold">{selectedAppointment.doctorName}</span>?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleCancel}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Yes, Cancel
              </button>
              <button
                onClick={closeCancelPopup}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
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