import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {useLocation} from 'react-router-dom';
import axios from "axios";

const AdminDashboard = () => {
    const location = useLocation();
  const [pendingDoctors, setPendingDoctors] = useState([]);
  const admin = location.state?.admin;
  // Fetch pending doctors on component mount
  useEffect(() => {
    const fetchPendingDoctors = async () => {
        try {
            const res = await axios.get("http://localhost:5000/pendingDoctors");
            if (res.data.status === "fetched") {
                setPendingDoctors(res.data.doctors); // Change `doctors` to `pending`
            } else {
                console.log("No pending doctors found.");
            }
        } catch (e) {
            console.error("Error fetching pending doctors:", e);
        }
    };

    fetchPendingDoctors();
}, []);


const handleAction = async (doctorId, action) => {
    try {
        const res = await axios.post("http://localhost:5000/updateDoctorStatus", {
            doctorId,
            status: action,
        });

        if (res.data.status === "updated") {
            setPendingDoctors((prev) =>
                prev.filter((doctor) => doctor._id !== doctorId)
            );
        }
        else{
            setPendingDoctors((prev) =>
                prev.filter((doctor) => doctor._id !== doctorId)
            );
        }

    } catch (e) {
        console.error(`Error updating doctor status:`, e);
    }
};


  return (
    <div className="container mx-auto p-6 flex justify-center">
      <motion.div
        className="max-w-5xl w-full bg-white shadow-xl rounded-2xl p-8 border border-gray-200 flex flex-col items-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl font-bold text-blue-600 mb-4">
          🏥 Admin Dashboard
        </h2>

        {pendingDoctors.length === 0 ? (
          <p className="text-lg text-gray-500">No pending doctor approvals.</p>
        ) : (
          <div className="w-full">
            {pendingDoctors.map((doctor) => (
              <div
                key={doctor._id}
                className="bg-gray-100 p-4 rounded-lg shadow-md mb-4"
              >
                <h3 className="text-2xl font-bold text-gray-800">{doctor.name}</h3>
                <p className="text-gray-600">{doctor.specialization}</p>

                <div className="mt-4 space-y-2">
                  <p><strong>📧 Email:</strong> {doctor.email}</p>
                  <p><strong>📞 Phone:</strong> {doctor.number}</p>
                  <p><strong>🔢 License:</strong> {doctor.licenseNumber}</p>
                  <p><strong>🏆 Experience:</strong> {doctor.Experience} years</p>
                  <p><strong>📚 Publications:</strong> {doctor.publications}</p>
                </div>

                <div className="mt-4 flex gap-4">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-md"
                    onClick={() => handleAction(doctor._id, "approved")}
                  >
                    ✅ Approve
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                    onClick={() => handleAction(doctor._id, "denied")}
                  >
                    ❌ Deny
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
