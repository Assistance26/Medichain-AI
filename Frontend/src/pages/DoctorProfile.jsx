import { useLocation } from "react-router-dom";
<<<<<<< HEAD
import { motion } from "framer-motion";
import { useState, useContext } from "react";
import axios from 'axios';
import {GlobalContext} from '../context/AppContext';

const DoctorProfile = () => {
  const {user, setUser} = useContext(GlobalContext);
  const location = useLocation();
  const doctor = location.state || {};
  const [appointmentDate, setAppointmentDate] = useState("");
=======
import { useState,useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {ChatbotContext} from '../context/ChatbotContext';
import axios from 'axios';

const bookedAppointments = {
  "2025-03-16": ["10:00 AM", "4:00 PM"],
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
      day: futureDate.toLocaleString("en-US", { weekday: "short" }),
      date: futureDate.getDate(),
      fullDate: futureDate.toISOString().split("T")[0],
    });
  }
  return dates;
};

const timeSlots = ["10:00 AM", "11:30 AM", "2:00 PM", "4:00 PM", "6:00 PM"];

const DoctorProfile = () => {
  const {user,setUser} = useContext(ChatbotContext);
  const location = useLocation();
  const doctor = location.state || {};
>>>>>>> 0c04fbbb3e00a2fbaa36098485eeb6de2f247715

  // Get today's date and one week later
  const today = new Date().toISOString().split("T")[0];
  const oneWeekLater = new Date();
  oneWeekLater.setDate(oneWeekLater.getDate() + 7);
  const maxDate = oneWeekLater.toISOString().split("T")[0];
  const [confirmedDate, setConfirmedDate] = useState(null);

<<<<<<< HEAD
  const handleAppointment = async () => {
    console.log(user);
    if (appointmentDate) {
      setConfirmedDate(appointmentDate);
      console.log(appointmentDate);
    }
    try{
     const res = await axios.post("http://localhost:5000/appointment",{
      appointmentDate,
      Docname: doctor.name,
      Patientname: user.name
     });
     if(res.data.status === "fixed"){
      console.log(res.data.date);
      alert("Date Fixed");
     }
     else{
      alert("Some Error");
     }
    }
    catch(e){
      console.log("Error",e);
    }
  };
=======
  const availableDates = getNextSevenDays();

  const handleBookAppointment = async () => {
    if (!doctor || !doctor.name) {
        console.error("Doctor name is missing");
        alert("Please select a doctor");
        return;
    }

    if (!user || !user.name) {
        console.error("User not logged in");
        alert("Please log in first");
        return;
    }

    if (!selectedDate || !selectedTime) {
        console.error("Date or time is missing");
        alert("Please select date and time");
        return;
    }

    console.log(doctor.name, ":", selectedDate, ",", selectedTime, "with:", user.name);

    try {
        const res = await axios.post("http://localhost:5000/appointment", {
            Docname: doctor.name,
            appointmentAt: selectedDate,
            timeSlot: selectedTime,
            PatientName: user.name
        });

        if (res.data.status === 'fixed') {
            console.log("Done:", res.data.date);
            alert("Appointment fixed!");
        } else {
            console.log("Issue:", res.data.status);
            alert(res.data.status);
        }
    } catch (e) {
        console.error("Error booking appointment:", e);
        alert("Something went wrong! Check console.");
    }
};


>>>>>>> 0c04fbbb3e00a2fbaa36098485eeb6de2f247715
  return (
    <div className="container mx-auto p-6 flex justify-center">
      <motion.div
<<<<<<< HEAD
        className="max-w-4xl w-full bg-white shadow-xl rounded-2xl p-8 border border-gray-200 flex flex-col items-center"
        initial={{ opacity: 0, y: 50 }}
=======
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-3xl border border-gray-200"
        initial={{ opacity: 0, y: 30 }}
>>>>>>> 0c04fbbb3e00a2fbaa36098485eeb6de2f247715
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
<<<<<<< HEAD
        {/* Profile Picture */}
        <div className="w-40 h-40 bg-gray-300 rounded-full overflow-hidden shadow-md mb-6">
          <img
            src={`https://i.pravatar.cc/150?u=${doctor.name}`}
=======
        {/* Doctor Info */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={doctor.photo || `https://i.pravatar.cc/150?u=${doctor.name}`}
>>>>>>> 0c04fbbb3e00a2fbaa36098485eeb6de2f247715
            alt={doctor.name}
            className="w-full h-full object-cover"
          />
<<<<<<< HEAD
        </div>

        {/* Doctor Details */}
        <h2 className="text-4xl font-bold text-blue-600">{doctor.name}</h2>
        <p className="text-xl text-gray-500 mb-6">{doctor.specialization}</p>
=======
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-extrabold text-blue-600">{doctor.name}</h2>
            <p className="text-lg text-indigo-600 font-semibold">{doctor.specialization}</p>
            <p className="mt-2 text-yellow-500 text-lg font-bold">⭐ {doctor.rating || "4.5"} / 5</p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-6 space-y-3">
          {[
            { label: "📧 Email", value: doctor.email },
            { label: "🔢 License Number", value: doctor.licenseNumber },
            { label: "🏆 Experience", value: `${doctor.Experience || "N/A"} years` },
          ].map((item, index) => (
            <div key={index} className="flex justify-between border-b border-gray-300 py-2 text-lg">
              <span className="font-semibold text-gray-700">{item.label}:</span>
              <span className="text-gray-900">{item.value || "N/A"}</span>
            </div>
          ))}
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
                  setSelectedTime("");
                  
                }}
              >
                <span>{d.day}</span>
                <span>{d.date}</span>
              </button>
            ))}
          </div>
        </div>
>>>>>>> 0c04fbbb3e00a2fbaa36098485eeb6de2f247715

        {/* Info Table Layout */}
        <div className="w-full mb-6">
          {[
            { label: "📧 Email", value: doctor.email },
            { label: "📞 Phone", value: doctor.number },
            { label: "🔢 License Number", value: doctor.licenseNumber },
            { label: "🏆 Experience", value: `${doctor.Experience} years` },
            { label: "📚 Publications", value: doctor.publications },
          ].map((item, index) => (
            <div
              key={index}
              className="flex justify-between border-b border-gray-300 py-3 text-lg"
            >
              <span className="font-semibold text-gray-700">{item.label}:</span>
              <span className="text-gray-900">{item.value}</span>
            </div>
          ))}
        </div>

        {/* Appointment Section */}
        <div className="w-full p-4 bg-gray-100 rounded-lg shadow-sm">
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">📅 Schedule an Appointment</h3>
          <input
            type="date"
            className="w-full p-2 border rounded-lg text-lg"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            min={today}
            max={maxDate}
          />
          {appointmentDate && (
            <div className="mt-4 w-full flex justify-center">
            <button
              className="px-4 py-2 mt-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
              onClick={handleAppointment}
            >
              Confirm Appointment on {appointmentDate}
            </button>
          {confirmedDate && <p className="mt-2 text-green-600 font-bold">Appointment confirmed for {appointmentDate}!</p>}
          </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default DoctorProfile;