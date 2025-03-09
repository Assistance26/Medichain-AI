import { useParams } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const doctors = [
  {
    name: "Dr. John Doe",
    specialty: "Cardiologist",
    description: "Expert in heart diseases and cardiovascular treatments.",
    rating: 4.8,
    photo: "https://via.placeholder.com/150",
  },
  {
    name: "Dr. Jane Smith",
    specialty: "Dermatologist",
    description: "Specialist in skin, hair, and nail disorders.",
    rating: 4.6,
    photo: "https://via.placeholder.com/150",
  },
];

// Simulated booked time slots (Replace this with real data from backend)
const bookedAppointments = {
  "2025-03-10": ["10:00 AM", "4:00 PM"],
  "2025-03-11": ["11:30 AM"],
};

// Generate the next 7 days dynamically
const getNextSevenDays = () => {
  const dates = [];
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + i);
    dates.push({
      day: futureDate.toLocaleString("en-US", { weekday: "short" }), // Mon, Tue, etc.
      date: futureDate.getDate(), // Numeric date
      fullDate: futureDate.toISOString().split("T")[0], // YYYY-MM-DD
    });
  }
  return dates;
};

const timeSlots = ["10:00 AM", "11:30 AM", "2:00 PM", "4:00 PM", "6:00 PM"];

const DoctorProfile = () => {
  const { doctorName } = useParams();
  const decodedName = decodeURIComponent(doctorName);
  const doctor = doctors.find((doc) => doc.name === decodedName);

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const availableDates = getNextSevenDays();

  if (!doctor) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Doctor not found.
      </div>
    );
  }

  const handleBookAppointment = () => {
    if (selectedDate && selectedTime) {
      setShowConfirmation(true);
      setTimeout(() => setShowConfirmation(false), 3000);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <motion.div
        className="bg-white/20 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-full max-w-3xl border border-white/30"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={doctor.photo}
            alt={doctor.name}
            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-lg border-4 border-white"
          />
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-extrabold text-gray-900">{doctor.name}</h2>
            <p className="text-lg text-indigo-600 font-semibold">{doctor.specialty}</p>
            <p className="mt-2 text-gray-700">{doctor.description}</p>
            <p className="mt-2 text-yellow-500 text-lg font-bold">⭐ {doctor.rating} / 5</p>
          </div>
        </div>

        {/* Date Selection */}
        <div className="mt-6">
          <label className="block text-gray-800 font-semibold text-lg mb-2">
            Select a Booking Date:
          </label>
          <div className="flex gap-3 justify-center md:justify-start">
            {availableDates.map((d) => (
              <button
                key={d.fullDate}
                className={`w-12 h-12 flex flex-col items-center justify-center rounded-full text-sm font-bold border transition ${
                  selectedDate === d.fullDate
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-gray-200 text-gray-800 border-gray-300 hover:bg-gray-300"
                }`}
                onClick={() => {
                  setSelectedDate(d.fullDate);
                  setSelectedTime(""); // Reset time when changing date
                }}
              >
                <span>{d.day}</span>
                <span>{d.date}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Time Slot Selection */}
        {selectedDate && (
          <motion.div
            className="mt-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <label className="block text-gray-800 font-semibold text-lg mb-2">
              Select a Time Slot:
            </label>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              {timeSlots.map((time) => {
                const isBooked =
                  bookedAppointments[selectedDate] &&
                  bookedAppointments[selectedDate].includes(time);

                return (
                  <button
                    key={time}
                    className={`px-4 py-2 rounded-lg border text-sm font-bold transition ${
                      isBooked
                        ? "bg-gray-300 text-gray-500 border-gray-400 cursor-not-allowed"
                        : selectedTime === time
                        ? "bg-green-600 text-white border-green-600"
                        : "bg-gray-200 text-gray-800 border-gray-300 hover:bg-gray-300"
                    }`}
                    disabled={isBooked}
                    onClick={() => !isBooked && setSelectedTime(time)}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Book Appointment Button */}
        <button
          className={`mt-6 py-3 px-6 w-full md:w-auto rounded-lg text-white font-bold text-lg transition-all ${
            selectedDate && selectedTime
              ? "bg-blue-600 hover:bg-blue-700 shadow-lg"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={!selectedDate || !selectedTime}
          onClick={handleBookAppointment}
        >
          Book Appointment
        </button>
      </motion.div>

      {/* Confirmation Popup */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-600 text-white py-4 px-6 rounded-xl shadow-lg text-center text-lg font-semibold"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            ✅ Appointment Booked for {selectedDate} at {selectedTime}!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DoctorProfile;
