import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
      }, 4000);
    }, 3000);
  };

  const handleReset = () => {
    setPrediction(null);
    setShowPrediction(false);
  };

  const pageVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 }
  };

  const loadingContainerVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    },
    exit: { 
      opacity: 0,
      transition: {
        staggerChildren: 0.1,
        staggerDirection: -1
      }
    }
  };

  const loadingDotVariants = {
    initial: { y: 0 },
    animate: {
      y: [-10, 0],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  const pulseVariants = {
    initial: { scale: 1, opacity: 0.5 },
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-background flex flex-col items-center justify-center px-4 relative overflow-hidden"
      initial="initial"
      animate="animate"
      variants={pageVariants}
      transition={{ duration: 0.6 }}
    >
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 animate-gradient" />
      <div className="absolute inset-0 backdrop-blur-[100px]" />

      {/* Content wrapper */}
      <div className="relative z-10 w-full max-w-4xl">
        {/* Header */}
        <motion.header 
          className="py-6 text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8, 
            type: "spring",
            bounce: 0.4 
          }}
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

        {/* Input Form */}
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
        {/* Reset Button */}
        <AnimatePresence>
          {showPrediction && (
            <motion.button 
              onClick={handleReset}
              className="mt-6 py-2 w-full px-4 bg-white/5 backdrop-blur-sm text-muted-foreground hover:bg-white/10 rounded-lg transition-all duration-300 border border-white/10 hover:border-white/20 transform hover:-translate-y-1 hover:shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Check Different Symptoms
            </motion.button>
          )}
        </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Enhanced AI Loading Animation */}
        <AnimatePresence>
          {(aiInitializing || loading) && (
            <motion.div
              className="flex flex-col items-center justify-center space-y-6 py-8"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={loadingContainerVariants}
            >
              {/* Pulsing Circle with Spinner */}
              <motion.div 
                className="relative"
                variants={pulseVariants}
              >
                <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl" />
                <AiLoadingSpinner />
              </motion.div>

              {/* Loading Text with Bouncing Dots */}
              <motion.div 
                className="flex items-center justify-center space-x-2 text-lg text-blue-500"
                variants={loadingContainerVariants}
              >
                <span className="font-medium">
                  {aiInitializing ? "Initializing AI" : "Processing"}
                </span>
                <div className="flex space-x-1">
                  {[0, 1, 2].map((index) => (
                    <motion.span
                      key={index}
                      variants={loadingDotVariants}
                      className="w-1.5 h-1.5 bg-blue-500 rounded-full"
                    >
                      .
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* Progress Indicator */}
              <motion.div 
                className="w-48 h-1 bg-blue-100/10 rounded-full overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ 
                    duration: aiInitializing ? 3 : 4,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Prediction Result & Graph */}
        <AnimatePresence>
          {showPrediction && prediction && !loading && (
            <motion.div 
              className="w-full max-w-2xl mt-6 space-y-6 mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
            >
              <div className="p-6 bg-white/5 backdrop-blur-lg rounded-xl shadow-xl border border-white/10 hover:border-white/20 transition-all duration-300">
                <PredictionResult prediction={prediction} />
              </div>

              {/* Action Buttons */}
              <motion.div 
                className="flex flex-col md:flex-row gap-4 justify-center mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <Link 
                  to="/aidoctor" 
                  className="w-full md:w-auto text-center bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-1"
                >
                  Consult with AiDoctor
                </Link>
                <Link 
                  to="/doctors" 
                  className="w-full md:w-auto text-center bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-6 rounded-lg hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300 transform hover:-translate-y-1"
                >
                  Book an Appointment
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        
      </div>
    </motion.div>
  );
}
