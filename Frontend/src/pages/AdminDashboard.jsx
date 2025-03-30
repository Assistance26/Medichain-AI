import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [pendingDoctors, setPendingDoctors] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("doctors");

  useEffect(() => {
    const fetchPendingDoctors = async () => {
      try {
        const res = await axios.get("http://localhost:5000/pendingDoctors");
        if (res.data.status === "fetched") {
          setPendingDoctors(res.data.doctors);
        }
      } catch (e) {
        console.error("Error fetching pending doctors:", e);
      }
    };

    const fetchAllUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/allUsers");
        if (res.data.status === "Fetched Successfully") {
          setAllUsers(res.data.users);
        }
      } catch (e) {
        console.error("Error fetching users:", e);
      }
    };

    fetchPendingDoctors();
    fetchAllUsers();
  }, []);

  const handleAction = async (doctorId, action) => {
    try {
      const res = await axios.post("http://localhost:5000/updateDoctorStatus", {
        doctorId,
        status: action,
      });

      if (res.data.status === "updated") {
        setPendingDoctors((prev) => prev.filter((doctor) => doctor._id !== doctorId));
      }
    } catch (e) {
      console.error(`Error updating doctor status:`, e);
    }
  };

  const handleRemove = async (userId) => {
    console.log(userId);
    try {
      const res = await axios.post("http://localhost:5000/removeUser",{
        userId
      });

      if (res.data.status === "User Removed") {
        console.log(res.data.delete);
        setAllUsers((prev) => prev.filter((user) => user._id !== userId));
      }
    } catch (e) {
      console.error("Error removing user:", e);
    }
  };

  return (
    <div className="container mx-auto p-6">
      {/* Navbar Tabs */}
      <div className="flex justify-center mb-6">
        <button
          className={`px-6 py-2 rounded-t-lg ${
            activeTab === "doctors" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("doctors")}
        >
          Doctors
        </button>
        <button
          className={`px-6 py-2 rounded-t-lg ${
            activeTab === "users" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("users")}
        >
          Users
        </button>
      </div>

      {/* Dashboard Content */}
      <motion.div
        className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8 border border-gray-200"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl font-bold text-blue-600 mb-4">🏥 Admin Dashboard</h2>

        {activeTab === "doctors" ? (
          <>
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">Pending Doctor Approvals</h3>
            {pendingDoctors.length === 0 ? (
              <p className="text-lg text-gray-500">No pending doctor approvals.</p>
            ) : (
              pendingDoctors.map((doctor) => (
                <div key={doctor._id} className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
                  <h3 className="text-2xl font-bold text-gray-800">{doctor.name}</h3>
                  <p className="text-gray-600">{doctor.specialization}</p>
                  <p><strong>📧 Email:</strong> {doctor.email}</p>
                  <p><strong>📞 Phone:</strong> {doctor.number}</p>
                  <p><strong>🔢 License:</strong> {doctor.licenseNumber}</p>
                  <p><strong>🏆 Experience:</strong> {doctor.Experience} years</p>
                  <p><strong>📚 Publications:</strong> {doctor.publications}</p>
                  <div className="mt-4 flex gap-4">
                    <button className="bg-green-500 text-white px-4 py-2 rounded-md" onClick={() => handleAction(doctor._id, "approved")}>✅ Approve</button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={() => handleAction(doctor._id, "denied")}>❌ Deny</button>
                  </div>
                </div>
              ))
            )}
          </>
        ) : (
          <>
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">Registered Users</h3>
            {allUsers.length === 0 ? (
              <p className="text-lg text-gray-500">No users found.</p>
            ) : (
              allUsers.map((user) => (
                <div key={user._id} className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
                  <h3 className="text-2xl font-bold text-gray-800">{user.name}</h3>
                  <p><strong>📧 Email:</strong> {user.email}</p>
                  <p><strong>📞 Phone:</strong> {user.phone}</p>
                  <div className="mt-4 flex gap-4">
                    <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={() => handleRemove(user._id)}>Remove</button>
                  </div>
                </div>
              ))
            )}
          </>
        )}
      </motion.div>
    </div>
  );
};

export default AdminDashboard;