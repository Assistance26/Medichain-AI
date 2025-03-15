import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import newLoadingAnimation from '../assets/loading.json'; // New animation file

export default function AiLoadingSpinner() {
  const [message, setMessage] = useState("Initializing AI Model...");

  useEffect(() => {
    const messages = [
      "Initializing AI Model...",
      "Loading Neural Network...",
      "Processing Symptoms...",
      "Generating Predictions..."
    ];
    
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % messages.length;
      setMessage(messages[index]);
    }, 2000); // Change message every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="flex flex-col items-center justify-center space-y-4 mt-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Lottie animationData={newLoadingAnimation} loop autoPlay style={{ width: 120, height: 120 }} />
      <p className="text-lg font-semibold text-primary">{message}</p>
    </motion.div>
  );
}
