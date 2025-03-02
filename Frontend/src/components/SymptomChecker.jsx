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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-green-400 text-white py-20 text-center">
        <motion.h1
          className="text-5xl font-bold mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          whileHover={{ textShadow: "0px 0px 20px rgba(255, 255, 255, 0.8)", scale: 1.05 }}
        >
          AI-Powered Symptom Checker
        </motion.h1>
        <motion.p className="text-lg max-w-2xl mx-auto opacity-75" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          Enter your symptoms and get a quick AI-powered health assessment.
        </motion.p>
      </section>

      {/* Symptom Checker Card */}
      <div className="flex items-center justify-center py-12 px-4">
        <motion.div
          className="bg-white p-8 rounded-xl shadow-lg text-center max-w-lg w-full border border-gray-200 hover:shadow-2xl transition duration-300"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Check Your Symptoms</h2>
          <p className="text-gray-600 mb-3">Enter your symptoms below for a quick diagnosis.</p>

          <input
            type="text"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="e.g. Fever, Cough, Fatigue"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
          />

          <motion.button
            onClick={handleCheck}
            className="w-full mt-4 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Diagnosis
          </motion.button>

          {diagnosis && (
            <motion.div
              className="mt-4 text-lg font-semibold bg-gray-100 p-3 rounded-lg border border-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Diagnosis: {diagnosis}
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Feature Cards Section */}
      <section className="py-16 bg-gray-100 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-8">Why Choose Us?</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {["AI-Powered Diagnosis", "Secure & Private", "Easy to Use"].map((title, index) => (
            <motion.div
              key={index}
              className="relative bg-white p-6 rounded-lg shadow-md border hover:border-blue-400 transition-all transform hover:scale-105 hover:shadow-2xl cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -5 }}
            >
              <h3 className="text-2xl font-semibold text-gray-700 mb-3">{title}</h3>
              <p className="text-gray-600">{index === 0 ? "Get fast and accurate health insights." : index === 1 ? "Your data is encrypted and protected." : "Simple interface for quick symptom analysis."}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 px-6 bg-white text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {["Enter Symptoms", "AI Analysis", "Get Advice"].map((title, index) => (
            <motion.div
              key={index}
              className="p-6 border border-gray-300 rounded-lg shadow-sm hover:shadow-lg transition transform hover:scale-105 relative"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.3 }}
              whileHover={{ rotateY: 10 }}
            >
              <h4 className="text-xl font-semibold text-gray-700 mb-2">Step {index + 1}</h4>
              <h5 className="text-lg font-medium text-blue-600 mb-1">{title}</h5>
              <p className="text-gray-600">{index === 0 ? "Type in your symptoms like fever, cough." : index === 1 ? "Our AI processes your symptoms for insights." : "Receive health recommendations instantly."}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SymptomChecker;
