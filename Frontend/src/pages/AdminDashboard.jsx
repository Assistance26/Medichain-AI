import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { BlockchainContext } from "../context/BlockchainContext";

const AdminDashboard = () => {
  const [pendingDoctors, setPendingDoctors] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("doctors");
  //policy contents
  const { insuranceContract, account } = useContext(BlockchainContext);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [coverageAmount, setCoverageAmount] = useState(0);
  const [coverage, setCoverage] = useState("");
  const [premiumDuration, setPremiumDuration] = useState("");

  const monthsToDaysMap = {
    monthly: 30,
    quarterly: 90,
    halfyearly: 180,
    yearly: 365,
  };

  const handleCreatePolicy = async () => {
    const premiumDurationInDays = monthsToDaysMap[premiumDuration];
    const premiumDurationInSeconds = premiumDurationInDays * 24 * 60 * 60;
    // console.log('days:',premiumDurationInDays, "seconds:",premiumDurationInSeconds);

    const ethToWei = Number(BigInt(price) * BigInt("1000000000000000000"));
    console.log("Price:", ethToWei);

    try {
      await insuranceContract.methods
        .createPolicy(
          name,
          ethToWei,
          coverageAmount,
          coverage,
          premiumDurationInSeconds
        )
        .send({ from: account });
      alert("Policy created successfully!");
      setName('');
      setPrice(0);
      setCoverageAmount(0);
      setCoverage('')
      setPremiumDuration("")
    } catch (error) {
      alert("Error creating policy: " + error.message);
    }
  };

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
        setPendingDoctors((prev) =>
          prev.filter((doctor) => doctor._id !== doctorId)
        );
      }
    } catch (e) {
      console.error("Error updating doctor status:", e);
    }
  };

  const handleRemove = async (userId) => {
    try {
      const res = await axios.post("http://localhost:5000/removeUser", {
        userId,
      });
      if (res.data.status === "User Removed") {
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
        <button
          className={`px-6 py-2 rounded-t-lg ${
            activeTab === "policy" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("policy")}
        >
          Policy
        </button>
      </div>

      {/* Dashboard Content */}
      <motion.div
        className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8 border border-gray-200"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl font-bold text-blue-600 mb-4">
          🏥 Admin Dashboard
        </h2>

        {activeTab === "doctors" ? (
          <>
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">
              Pending Doctor Approvals
            </h3>
            {pendingDoctors.length === 0 ? (
              <p className="text-lg text-gray-500">
                No pending doctor approvals.
              </p>
            ) : (
              pendingDoctors.map((doctor) => (
                <div
                  key={doctor._id}
                  className="bg-gray-100 p-4 rounded-lg shadow-md mb-4"
                >
                  <h3 className="text-2xl font-bold text-gray-800">
                    {doctor.name}
                  </h3>
                  <p className="text-gray-600">{doctor.specialization}</p>
                  <p>
                    <strong>📧 Email:</strong> {doctor.email}
                  </p>
                  <p>
                    <strong>📞 Phone:</strong> {doctor.number}
                  </p>
                  <p>
                    <strong>🔢 License:</strong> {doctor.licenseNumber}
                  </p>
                  <p>
                    <strong>🏆 Experience:</strong> {doctor.Experience} years
                  </p>
                  <p>
                    <strong>📚 Publications:</strong> {doctor.publications}
                  </p>
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
              ))
            )}
          </>
        ) : activeTab === "users" ? (
          <>
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">
              Registered Users
            </h3>
            {allUsers.length === 0 ? (
              <p className="text-lg text-gray-500">No users found.</p>
            ) : (
              allUsers.map((user) => (
                <div
                  key={user._id}
                  className="bg-gray-100 p-4 rounded-lg shadow-md mb-4"
                >
                  <h3 className="text-2xl font-bold text-gray-800">
                    {user.name}
                  </h3>
                  <p>
                    <strong>📧 Email:</strong> {user.email}
                  </p>
                  <p>
                    <strong>📞 Phone:</strong> {user.phone}
                  </p>
                  <div className="mt-4 flex gap-4">
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-md"
                      onClick={() => handleRemove(user._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </>
        ) : (
          <>
            <div className="max-w-2xl mx-auto p-6">
              <h3 className="text-2xl font-semibold mb-6">
                Create Insurance Policy
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Policy Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter policy name"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Premium Price (ETH)
                  </label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Enter premium price"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Coverage Amount (ETH)
                  </label>
                  <input
                    type="number"
                    value={coverageAmount}
                    onChange={(e) => setCoverageAmount(e.target.value)}
                    placeholder="Enter coverage amount"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Coverage Description
                  </label>
                  <textarea
                    value={coverage}
                    onChange={(e) => setCoverage(e.target.value)}
                    placeholder="Enter coverage description"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="4"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Premium Duration
                  </label>
                  <select
                    value={premiumDuration}
                    onChange={(e) => setPremiumDuration(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select premium duration</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="halfyearly">Half-Yearly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>

                <button
                  onClick={handleCreatePolicy}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Policy
                </button>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
