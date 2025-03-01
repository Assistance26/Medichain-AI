import { motion } from "framer-motion";

const ServiceCard = ({ title, description, icon }) => {
  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-xl text-center hover:shadow-2xl transition duration-300 cursor-pointer transform hover:scale-105"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
    >
      <div className="text-6xl mb-3">{icon}</div>
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      <p className="text-gray-600 mt-2">{description}</p>
    </motion.div>
  );
};

export default ServiceCard;
