import { Link } from "react-router-dom";
import { AiOutlineRobot } from "react-icons/ai";
import { MdHealthAndSafety, MdOutlineMedicalServices } from "react-icons/md";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { motion } from "framer-motion";

// Define services with corresponding route paths and descriptions
const services = [
  { 
    name: "AI Doctor", 
    description: "Get instant medical advice from AI-powered diagnostics.", 
    icon: <AiOutlineRobot />, 
    path: "/aidoctor" 
  },
  { 
    name: "Symptoms Checker", 
    description: "Check your symptoms and get potential diagnoses.", 
    icon: <MdOutlineMedicalServices />, 
    path: "/symptom-checker" 
  },
  { 
    name: "Health Score", 
    description: "Assess your overall health with AI-based scoring.", 
    icon: <MdHealthAndSafety />, 
    path: "/health-score" 
  },
  { 
    name: "AI Cost Planning", 
    description: "Estimate treatment costs based on real hospital data.", 
    icon: <FaMoneyCheckAlt />, 
    path: "/cost-planning" 
  },
];

const Services = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700 px-6 py-10">
      <motion.h3
        className="text-3xl font-bold text-white text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        Our Services
      </motion.h3>

      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
        }}
      >
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="bg-white text-gray-900 p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-105"
            whileHover={{ scale: 1.1, rotate: 3 }}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <Link to={service.path} className="flex flex-col items-center">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-full shadow-md">
                {service.icon}
              </div>
              <p className="mt-3 font-semibold text-lg">{service.name}</p>
              <p className="text-gray-600 text-sm mt-2">{service.description}</p>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Services;
