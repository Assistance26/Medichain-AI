import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const DoctorDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get doctor data from location state
  const doctor = location.state?.doctor;

<<<<<<< HEAD
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [earnings, setEarnings] = useState(0);

  useEffect(() => {
    if (!doctor) {
      navigate("/login");
      return;
    }

    const fetchAppointments = async () => {
      try {
        const res = await axios.get("http://localhost:5000/fetchDates");
        if (res.data.status === "fetched") {
          console.log("Fetched Appointments:", res.data.dates);

          const doctorAppointments = res.data.dates.find(d => d._id === doctor._id);
          
          if (doctorAppointments) {
            setAppointments(doctorAppointments.appointmentAt || []);
            setPatients(doctorAppointments.appointmentWith || []);
          }
        } else {
          console.log("No Appointments yet");
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, [doctor, navigate]);
=======
  // Redirect if doctor data is missing
  useEffect(() => {
    if (!doctor) {
      navigate("/login");
    }
  }, [doctor, navigate]);

  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);

  // Fetch appointments when the component mounts
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get("http://localhost:5000/fetchDates", {
          params: { name: doctor.name },
        });
  
        if (res.data.status === "fetched") {
          console.log("Fetched Appointments:", res.data);
  
          // Structuring the fetched data properly
          const fetchedAppointments = res.data.dates.appointmentAt.map((date, index) => ({
            appointmentAt: date,
            appointmentWith: res.data.dates.appointmentWith[index] || "Unknown",
            timeSlot: res.data.dates.timeSlot[index] || "Time not specified",
          }));
  
          setAppointments(fetchedAppointments);
        } else {
          console.log("Issue: Unexpected response status");
        }
      } catch (e) {
        console.error("Error fetching appointments:", e);
      }
    };
  
    fetchAppointments();
  }, [doctor]);
  
>>>>>>> 0c04fbbb3e00a2fbaa36098485eeb6de2f247715

  return (
    <div className="container mx-auto p-6 flex justify-center">
      <motion.div
        className="max-w-5xl w-full bg-white shadow-xl rounded-2xl p-8 border border-gray-200 flex flex-col items-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
<<<<<<< HEAD
        {/* Show loading message if doctor data is missing */}
        {!doctor ? (
          <h2 className="text-2xl font-bold text-red-600">Loading Doctor Data...</h2>
=======
        {!doctor ? (
          <h2 className="text-2xl font-bold text-red-600">
            Loading Doctor Data...
          </h2>
>>>>>>> 0c04fbbb3e00a2fbaa36098485eeb6de2f247715
        ) : (
          <>
            {/* Doctor Details */}
            <h2 className="text-4xl font-bold text-blue-600">{doctor.name}</h2>
            <p className="text-xl text-gray-500 mb-6">{doctor.specialization}</p>

            {/* Doctor Info Table */}
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
<<<<<<< HEAD
                  <span className="font-semibold text-gray-700">{item.label}:</span>
=======
                  <span className="font-semibold text-gray-700">
                    {item.label}:
                  </span>
>>>>>>> 0c04fbbb3e00a2fbaa36098485eeb6de2f247715
                  <span className="text-gray-900">{item.value || "N/A"}</span>
                </div>
              ))}
            </div>

<<<<<<< HEAD
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">

              <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
                <h3 className="text-2xl font-semibold text-blue-600 mb-3">📅 Upcoming Appointments</h3>
                {appointments.length > 0 ? (
                  appointments.map((appt, index) => (
                    <p key={index} className="text-gray-700">
                      {appt} with {patients[index] || "Unknown"}
                    </p>
                  ))
                ) : (
                  <p className="text-gray-700">No upcoming appointments.</p>
                )}
              </div>

              {/* Patient List */}
              <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
                <h3 className="text-2xl font-semibold text-blue-600 mb-3">👨‍⚕️ Patient List</h3>
                {patients.length > 0 ? (
                  patients.map((patient, index) => (
                    <p key={index} className="text-gray-700">{patient}</p>
                  ))
=======
            {/* Dashboard Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              {/* Upcoming Appointments */}
              <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
  <h3 className="text-2xl font-semibold text-blue-600 mb-3">
    📅 Upcoming Appointments
  </h3>
  {appointments.length > 0 ? (
    <ul className="list-disc pl-5 text-gray-700">
      {appointments.map((appt, index) => (
        <li key={index} className="mb-2 border-b pb-2">
          <strong>Patient:</strong> {appt.appointmentWith} <br />
          <strong>Date:</strong> {appt.appointmentAt} <br />
          <strong>Time:</strong> {appt.timeSlot}
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-gray-700">No upcoming appointments.</p>
  )}
</div>

              {/* Patient List */}
              <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
                <h3 className="text-2xl font-semibold text-blue-600 mb-3">
                  👨‍⚕️ Patient List
                </h3>
                {patients.length > 0 ? (
                  <ul className="list-disc pl-5 text-gray-700">
                    {patients.map((patient, index) => (
                      <li key={index}>{patient}</li>
                    ))}
                  </ul>
>>>>>>> 0c04fbbb3e00a2fbaa36098485eeb6de2f247715
                ) : (
                  <p className="text-gray-700">No registered patients.</p>
                )}
              </div>
<<<<<<< HEAD

              {/* Notifications */}
              <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
                <h3 className="text-2xl font-semibold text-blue-600 mb-3">🔔 Notifications</h3>
                {notifications.length > 0 ? (
                  notifications.map((notif, index) => (
                    <p key={index} className="text-gray-700">{notif}</p>
                  ))
                ) : (
                  <p className="text-gray-700">No new notifications.</p>
                )}
              </div>

              {/* Earnings */}
              <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
                <h3 className="text-2xl font-semibold text-blue-600 mb-3">💰 Earnings</h3>
                <p className="text-gray-700">${earnings.toFixed(2)}</p>
              </div>
=======
>>>>>>> 0c04fbbb3e00a2fbaa36098485eeb6de2f247715
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default DoctorDashboard;
