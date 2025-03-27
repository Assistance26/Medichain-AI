// import { motion } from "framer-motion";
// import { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { FaVideo } from "react-icons/fa"; // For video call button icon
// import VideoCall from "../components/VideoCall"; // Import the VideoCall component

// const DoctorDashboard = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   // Get doctor data from location state
//   const doctor = location.state?.doctor;

//   // Redirect if doctor data is missing
//   useEffect(() => {
//     if (!doctor) {
//       navigate("/login");
//     }
//   }, [doctor, navigate]);

//   const [appointments, setAppointments] = useState([]);
//   const [patients, setPatients] = useState([]);
//   const [isVideoCallActive, setIsVideoCallActive] = useState(false); // State for handling video call
//   const [roomName, setRoomName] = useState("");
//   const [identity, setIdentity] = useState("");

//   // Fetch appointments when the component mounts
//   useEffect(() => {
//     const fetchAppointments = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/fetchDates", {
//           params: { name: doctor.name },
//         });
   
//         if (res.data.status === "fetched") {
//           console.log("Fetched Appointments:", res.data);
  
//           // Structuring the fetched data properly
//           const fetchedAppointments = res.data.dates.appointmentAt.map((date, index) => ({
//             appointmentAt: date,
//             appointmentWith: res.data.dates.appointmentWith[index] || "Unknown",
//             timeSlot: res.data.dates.timeSlot[index] || "Time not specified",
//           }));
  
//           setAppointments(fetchedAppointments);
//         } else {
//           console.log("Issue: Unexpected response status");
//         }
//       } catch (e) {
//         console.error("Error fetching appointments:", e);
//       }
//     };
  
//     fetchAppointments();
//   }, [doctor]);

//   const startVideoCall = (appointmentId, patientName) => {
//     setIdentity(doctor.name); // Doctor's identity
//     setRoomName(`room_${appointmentId}`); // Create a unique room name based on appointment ID
//     setIsVideoCallActive(true); // Activate the video call UI
//   };

//   const closeVideoCall = () => {
//     setIsVideoCallActive(false); // Close the video call
//   };

//   return (
//     <div className="container mx-auto p-6 flex justify-center">
//       <motion.div
//         className="max-w-5xl w-full bg-white shadow-xl rounded-2xl p-8 border border-gray-200 flex flex-col items-center"
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         {!doctor ? (
//           <h2 className="text-2xl font-bold text-red-600">
//             Loading Doctor Data...
//           </h2>
//         ) : (
//           <>
//             {/* Doctor Details */}
//             <h2 className="text-4xl font-bold text-blue-600">{doctor.name}</h2>
//             <p className="text-xl text-gray-500 mb-6">{doctor.specialization}</p>

//             {/* Doctor Info Table */}
//             <div className="w-full mb-6">
//               {[
//                 { label: "📧 Email", value: doctor.email },
//                 { label: "📞 Phone", value: doctor.number },
//                 { label: "🔢 License Number", value: doctor.licenseNumber },
//                 { label: "🏆 Experience", value: `${doctor.Experience} years` },
//                 { label: "📚 Publications", value: doctor.publications },
//               ].map((item, index) => (
//                 <div
//                   key={index}
//                   className="flex justify-between border-b border-gray-300 py-3 text-lg"
//                 >
//                   <span className="font-semibold text-gray-700">
//                     {item.label}:
//                   </span>
//                   <span className="text-gray-900">{item.value || "N/A"}</span>
//                 </div>
//               ))}
//             </div>

//             {/* Dashboard Sections */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
//               {/* Upcoming Appointments */}
//               <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
//                 <h3 className="text-2xl font-semibold text-blue-600 mb-3">
//                   📅 Upcoming Appointments
//                 </h3>
//                 {appointments.length > 0 ? (
//                   <ul className="list-disc pl-5 text-gray-700">
//                     {appointments.map((appt, index) => (
//                       <li key={index} className="mb-2 border-b pb-2">
//                         <strong>Patient:</strong> {appt.appointmentWith} <br />
//                         <strong>Date:</strong> {appt.appointmentAt} <br />
//                         <strong>Time:</strong> {appt.timeSlot} <br />
//                         <button
//                           onClick={() => startVideoCall(appt.appointmentId, appt.appointmentWith)}
//                           className="flex items-center gap-2 bg-blue-500 text-white px-3 py-1 mt-2 rounded-lg hover:bg-blue-600 transition"
//                         >
//                           <FaVideo /> Join Call
//                         </button>
//                       </li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <p className="text-gray-700">No upcoming appointments.</p>
//                 )}
//               </div>

//               {/* Patient List */}
//               <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
//                 <h3 className="text-2xl font-semibold text-blue-600 mb-3">
//                   👨‍⚕️ Patient List
//                 </h3>
//                 {patients.length > 0 ? (
//                   <ul className="list-disc pl-5 text-gray-700">
//                     {patients.map((patient, index) => (
//                       <li key={index}>{patient}</li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <p className="text-gray-700">No registered patients.</p>
//                 )}
//               </div>
//             </div>
//           </>
//         )}
//       </motion.div>

//       {/* Video Call Component */}
//       {isVideoCallActive && (
//         <VideoCall
//           roomName={roomName}
//           identity={identity}
//           onClose={closeVideoCall}
//         />
//       )}
//     </div>
//   );
// };

// export default DoctorDashboard;





import { useEffect, useState } from "react";
import axios from "axios";


const DoctorDashboard = () => {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/doctor/profile", {
          withCredentials: true, // Ensure authentication if needed
        });

        if (res.data.success) {
          setDoctor(res.data.doctor);
        } else {
          console.error("Failed to fetch doctor data");
        }
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorData();
  }, []);

  return (
    <>
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-6">
        {loading ? (
          <p className="text-center text-gray-500">Loading doctor details...</p>
        ) : doctor ? (
          <>
            <h2 className="text-2xl font-bold text-center text-blue-700">
              {doctor.name}
            </h2>
            <p className="text-center text-gray-500">{doctor.specialization}</p>
            <div className="mt-4 space-y-3">
              <p>📧 Email: {doctor.email}</p>
              <p>📞 Phone: {doctor.phone}</p>
              <p>🔢 License Number: {doctor.licenseNumber}</p>
              <p>🏆 Experience: {doctor.experience} years</p>
              <p>📚 Publications: {doctor.publications || "N/A"}</p>
            </div>
          </>
        ) : (
          <p className="text-center text-red-500">Failed to load doctor details.</p>
        )}
      </div>
    </>
  );
};

export default DoctorDashboard;
