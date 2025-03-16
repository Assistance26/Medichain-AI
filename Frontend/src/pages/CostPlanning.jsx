import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import dataset from "../data/treatment_cost_dataset.json";

const CostPlanning = () => {
  const [disease, setDisease] = useState("");
  const [hospitalSize, setHospitalSize] = useState("Small");
  const [hospitalName, setHospitalName] = useState("");
  const [estimatedCost, setEstimatedCost] = useState(null);
  const [diseaseOptions, setDiseaseOptions] = useState([]);
  const [hospitalOptions, setHospitalOptions] = useState([]);

  useEffect(() => {
    const uniqueDiseases = [...new Set(dataset.map((item) => item.Disease))];
    const uniqueHospitals = [...new Set(dataset.map((item) => item["Hospital Name"]))];
    setDiseaseOptions(uniqueDiseases);
    setHospitalOptions(uniqueHospitals);
  }, []);

  const calculateCost = () => {
    let filteredData = dataset.filter((item) => item.Disease === disease);

    if (hospitalName) {
      filteredData = filteredData.filter((item) => item["Hospital Name"] === hospitalName);
    } else {
      filteredData = filteredData.filter((item) => item["Hospital Size"] === hospitalSize);
    }

    if (filteredData.length > 0) {
      setEstimatedCost(filteredData[0]["Treatment Cost"]);
    } else {
      setEstimatedCost("No data available");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 animate-gradient">
      <motion.div 
        className="max-w-2xl mx-auto p-6 bg-white/20 backdrop-blur-lg shadow-lg rounded-lg border border-white/30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.h2 
          className="text-2xl font-bold text-white mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          Treatment Cost Estimator
        </motion.h2>

        {/* Disease Dropdown */}
        <motion.div className="mb-4">
          <label className="block font-medium text-white">Select Disease</label>
          <select
            value={disease}
            onChange={(e) => setDisease(e.target.value)}
            className="w-full p-2 border rounded mt-1 bg-white/40 backdrop-blur text-black"
          >
            <option value="">-- Select Disease --</option>
            {diseaseOptions.map((d, index) => (
              <option key={index} value={d}>{d}</option>
            ))}
          </select>
        </motion.div>

        {/* Hospital Size Selection */}
        <motion.div className="mb-4">
          <label className="block font-medium text-white">Hospital Size</label>
          <select
            value={hospitalSize}
            onChange={(e) => setHospitalSize(e.target.value)}
            className="w-full p-2 border rounded mt-1 bg-white/40 backdrop-blur text-black"
          >
            <option value="Small">Small Hospital</option>
            <option value="Large">Large Hospital</option>
          </select>
        </motion.div>

        {/* Hospital Name Input */}
        <motion.div className="mb-4">
          <label className="block font-medium text-white">Hospital Name (Optional)</label>
          <input
            type="text"
            list="hospital-list"
            value={hospitalName}
            onChange={(e) => setHospitalName(e.target.value)}
            className="w-full p-2 border rounded mt-1 bg-white/40 backdrop-blur text-black"
            placeholder="Enter hospital name"
          />
          <datalist id="hospital-list">
            {hospitalOptions.map((h, index) => (
              <option key={index} value={h} />
            ))}
          </datalist>
        </motion.div>

        {/* Calculate Button */}
        <motion.button
          onClick={calculateCost}
          className="w-full bg-blue-500 text-white p-2 rounded mt-3 hover:bg-blue-600"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Estimate Cost
        </motion.button>

        {/* Display Estimated Cost */}
        {estimatedCost !== null && (
          <motion.div
            className="mt-4 p-4 bg-white/30 backdrop-blur-lg border border-white/40 rounded"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-lg font-semibold text-white">Estimated Cost:</h3>
            <p className="text-xl font-bold text-white">₹{estimatedCost}</p>
          </motion.div>
        )}
      </motion.div>

      <style>
        {`
          @keyframes gradientAnimation {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradient {
            background-size: 200% 200%;
            animation: gradientAnimation 10s ease infinite;
          }
        `}
      </style>
    </div>
  );
};

export default CostPlanning;
