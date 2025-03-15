import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useContext } from "react";
import axios from 'axios';
import {GlobalContext} from '../context/AppContext';

const DoctorProfile = () => {
  const {user, setUser} = useContext(GlobalContext);
  const location = useLocation();
  const doctor = location.state || {};
  const [appointmentDate, setAppointmentDate] = useState("");

  // Get today's date and one week later
  const today = new Date().toISOString().split("T")[0];
  const oneWeekLater = new Date();
  oneWeekLater.setDate(oneWeekLater.getDate() + 7);
  const maxDate = oneWeekLater.toISOString().split("T")[0];
  const [confirmedDate, setConfirmedDate] = useState(null);

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
  return (
    <div className="container mx-auto p-6 flex justify-center">
      <motion.div
        className="max-w-4xl w-full bg-white shadow-xl rounded-2xl p-8 border border-gray-200 flex flex-col items-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Profile Picture */}
        <div className="w-40 h-40 bg-gray-300 rounded-full overflow-hidden shadow-md mb-6">
          <img
            src={`https://i.pravatar.cc/150?u=${doctor.name}`}
            alt={doctor.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Doctor Details */}
        <h2 className="text-4xl font-bold text-blue-600">{doctor.name}</h2>
        <p className="text-xl text-gray-500 mb-6">{doctor.specialization}</p>

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