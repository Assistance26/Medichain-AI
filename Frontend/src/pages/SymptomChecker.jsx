import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import SymptomForm from "../components/SymptomForm";
import PredictionResult from "../components/PredictionResult";
import AiLoadingSpinner from "../components/AiLoadingSpinner";

export default function SymptomChecker() {
  const [ques, setQues] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [showPrediction, setShowPrediction] = useState(false);
  const [loading, setLoading] = useState(false);
  const [aiInitializing, setAiInitializing] = useState(false);
  const navigate = useNavigate();

  const handlePrediction = (result) => {
    setAiInitializing(true);
  
    setTimeout(() => {
      setAiInitializing(false);
      setLoading(true);
  
      setTimeout(() => {
        if (result?.topDisease?.name) {
          // Store the entire result for PredictionResult
          setPrediction(result);
          setQues(result.topDisease.name); // Store disease name for AI message
          console.log(result.topDisease.name);
        } else {
          setPrediction({ topDisease: { name: "Prediction Unavailable" }, otherPossibilities: [] });
          console.warn("No disease name found in result.");
        }
        setShowPrediction(true);
        setLoading(false);
      }, 4000);
    }, 3000);
  };
  
  
  const handleReset = () => {
     console.log(ques);
    setPrediction(null);
    setShowPrediction(false);
  };

  return (
    <motion.div
      className="min-h-screen bg-background flex flex-col items-center justify-center px-4 relative overflow-hidden"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 animate-gradient" />
      <div className="absolute inset-0 backdrop-blur-[100px]" />

      <div className="relative z-10 w-full max-w-4xl">
        <motion.header
          className="py-6 text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        >
          <h1 className="text-4xl font-bold text-foreground bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Symptom Checker
          </h1>
          <motion.p
            className="text-muted-foreground mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Enter your symptoms to get potential disease predictions
          </motion.p>
        </motion.header>

        <AnimatePresence mode="wait">
          {!aiInitializing && !loading && (
            <motion.div
              className="w-full max-w-lg mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="p-6 bg-white/5 backdrop-blur-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/10">
                <SymptomForm onPrediction={handlePrediction} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {(aiInitializing || loading) && (
            <motion.div className="flex flex-col items-center justify-center space-y-6 py-8">
              <motion.div className="relative">
                <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl" />
                <AiLoadingSpinner />
              </motion.div>
              <motion.div className="flex items-center justify-center space-x-2 text-lg text-blue-500">
                <span className="font-medium">
                  {aiInitializing ? "Initializing AI" : "Processing"}
                </span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showPrediction && prediction && !loading && (
            <motion.div className="w-full max-w-2xl mt-6 space-y-6 mx-auto">
              <div className="p-6 bg-white/5 backdrop-blur-lg rounded-xl shadow-xl border border-white/10">
                <PredictionResult prediction={prediction} />
              </div>
              <motion.div className="flex flex-col md:flex-row gap-4 justify-center mt-6">
                <Link
                  to="/aidoctor"
                  state={{
                    initialMessage: `i have ${prediction?.topDisease?.name ||
                      ques?.topDisease?.name || "Prediction"
                    }?`,
                  }}
                  className="w-full md:w-auto"
                >
                  <button
                    className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-1"
                  >
                    Ask AI About {prediction?.topDisease?.name || ques?.topDisease.name || "Prediction"}
                  </button>
                </Link>
                <Link
                  to="/doctor"
                  className="w-full md:w-auto bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-6 rounded-lg hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300 transform hover:-translate-y-1"
                >
                  Book an Appointment
                </Link>
              </motion.div>
              <motion.button
                onClick={handleReset}
                className="mt-6 py-2 w-full px-4 bg-white/5 backdrop-blur-sm text-muted-foreground hover:bg-white/10 rounded-lg"
              >
                Check Different Symptoms
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}