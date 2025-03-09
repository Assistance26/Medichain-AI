import { useState, useEffect } from "react";
import { FaVideo, FaTimes } from "react-icons/fa";

const Appointment = () => {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      doctorName: "Dr. John Doe",
      specialization: "Cardiologist",
      date: "2025-03-10",
      time: "10:30 AM",
      status: "Upcoming",
      meetingLink: "https://zoom.us/j/1234567890",
      image: "https://via.placeholder.com/80",
    },
    {
      id: 2,
      doctorName: "Dr. Jane Smith",
      specialization: "Dermatologist",
      date: "2025-03-12",
      time: "2:00 PM",
      status: "Upcoming",
      meetingLink: "https://meet.google.com/xyz-abc-def",
      image: "https://via.placeholder.com/80",
    },
  ]);

  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const isMeetingExpired = (appointment) => {
    const meetingDateTime = new Date(`${appointment.date} ${appointment.time}`);
    const fiveMinutesAfterStart = new Date(meetingDateTime.getTime() + 5 * 60000);
    return currentTime > fiveMinutesAfterStart;
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
              {/* Doctor Image & Info */}
              <div className="flex items-center gap-4">
                <img
                  src={appointment.image}
                  alt={appointment.doctorName}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold">{appointment.doctorName}</h3>
                  <p className="text-sm text-gray-500">{appointment.specialization}</p>
                  <p className="text-sm text-gray-600">
                    {appointment.date} at {appointment.time}
                  </p>
                </div>
              </div>

              {/* Status & Actions */}
              <div className="flex items-center gap-4">
                <span
                  className={`px-3 py-1 text-sm font-medium rounded-full ${
                    appointment.status === "Upcoming"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {appointment.status}
                </span>

                {/* Join Meeting Button */}
                {isMeetingExpired(appointment) ? (
                  <p className="text-red-500 font-semibold">You failed to join the meeting</p>
                ) : (
                  <a
                    href={appointment.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    <FaVideo />
                    Join Meeting
                  </a>
                )}

                {/* Cancel Button */}
                <button
                  onClick={() => openCancelPopup(appointment)}
                  className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  <FaTimes />
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Cancel Confirmation Popup */}
      {selectedAppointment && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
            <h3 className="text-lg font-semibold mb-4">Cancel Appointment</h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to cancel your appointment with{" "}
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
    </div>
  );
};

export default Appointment;
