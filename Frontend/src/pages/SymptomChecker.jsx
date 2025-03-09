import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SymptomForm from '../components/SymptomForm';
import PredictionResult from '../components/PredictionResult';
import AiLoadingSpinner from '../components/AiLoadingSpinner';

export default function SymptomChecker() {
  const [prediction, setPrediction] = useState(null);
  const [showPrediction, setShowPrediction] = useState(false);
  const [loading, setLoading] = useState(false);
  const [aiInitializing, setAiInitializing] = useState(false);

  const handlePrediction = (result) => {
    setAiInitializing(true);
    setTimeout(() => {
      setAiInitializing(false);
      setLoading(true);
      setTimeout(() => {
        setPrediction(result);
        setShowPrediction(true);
        setLoading(false);
      }, 4000); // Simulated model training time
    }, 3000); // AI Initialization time
  };

  const handleReset = () => {
    setPrediction(null);
    setShowPrediction(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      {/* Header */}
      <motion.header 
        className="py-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-foreground">Symptom Checker</h1>
        <p className="text-muted-foreground mt-2">
          Enter your symptoms to get potential disease predictions
        </p>
      </motion.header>

      {/* Input Form */}
      {!aiInitializing && !loading && (
        <motion.div 
          className="w-full max-w-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <SymptomForm onPrediction={handlePrediction} />
        </motion.div>
      )}

      {/* AI Initialization & Training Animation */}
      {aiInitializing && <AiLoadingSpinner />}
      {loading && !aiInitializing && <AiLoadingSpinner />}

      {/* Prediction Result & Graph */}
      {showPrediction && prediction && !loading && (
        <motion.div 
          className="w-full max-w-2xl mt-6 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <PredictionResult prediction={prediction} />

          {/* Action Buttons */}
          <motion.div 
            className="flex flex-col md:flex-row gap-4 justify-center mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link 
              to="/aidoctor" 
              className="w-full md:w-auto text-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
            >
              Consult with AiDoctor
            </Link>
            <Link 
              to="/doctors" 
              className="w-full md:w-auto text-center bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
            >
              Book an Appointment
            </Link>
          </motion.div>
        </motion.div>
      )}

      {/* Reset Button */}
      {showPrediction && (
        <motion.button 
          onClick={handleReset}
          className="mt-6 py-2 px-4 bg-muted text-muted-foreground hover:bg-muted/80 rounded-lg transition"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          Check Different Symptoms
        </motion.button>
      )}
    </div>
  );
}
