import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const SymptomChecker = () => {
  const [symptoms, setSymptoms] = useState("");
  const [diagnosis, setDiagnosis] = useState("");

  const handleCheck = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/check", {
        symptoms: symptoms.split(","),
      });
      setDiagnosis(res.data.diagnosis);
    } catch (error) {
      console.error("Error fetching diagnosis:", error);
      setDiagnosis("Failed to get diagnosis.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-400 flex flex-col items-center justify-center px-4 text-center py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="text-white"
      >
        <h1 className="text-5xl font-bold drop-shadow-lg">AI-Powered Symptom Checker</h1>
        <p className="text-lg mt-2 drop-shadow-md">Enter your symptoms and get a quick AI-powered health assessment.</p>
      </motion.div>
      
      <motion.div
        className="mt-10 w-full max-w-xl bg-white p-6 rounded-lg shadow-2xl border border-gray-200"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-semibold text-blue-700 mb-4">Check Your Symptoms</h2>
        <input
          type="text"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          placeholder="e.g. Fever, Cough, Fatigue"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
        />
        <motion.button
          onClick={handleCheck}
          className="w-full mt-4 p-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Diagnosis
        </motion.button>
        {diagnosis && (
          <motion.div
            className="mt-4 text-lg font-semibold p-3 bg-blue-100 border border-blue-300 rounded-lg text-blue-700 shadow-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Diagnosis: {diagnosis}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default SymptomChecker;