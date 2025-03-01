import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <motion.h1
        className="text-4xl font-bold text-gray-800 mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        About MediChain AI
      </motion.h1>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
        {/* Card 1 */}
        <motion.div
          className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold text-gray-700 mb-3">Our Mission</h2>
          <p className="text-gray-600">
            MediChain AI is dedicated to providing AI-driven healthcare solutions that empower users to check symptoms, get
            medical insights, and improve access to healthcare.
          </p>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl font-semibold text-gray-700 mb-3">Why Choose Us?</h2>
          <p className="text-gray-600">
            Our AI-powered system offers fast, reliable, and secure symptom analysis, ensuring you receive the best possible
            healthcare recommendations.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;
