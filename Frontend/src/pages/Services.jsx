import ServiceCard from "../components/ServiceCard";
import { motion } from "framer-motion";

const services = [
  {
    title: "AI-Powered Diagnosis",
    description: "Get instant AI-driven medical analysis based on your symptoms.",
    icon: "🤖",
  },
  {
    title: "Secure Health Records",
    description: "Safely store and access your health records anytime, anywhere.",
    icon: "🔒",
  },
  {
    title: "24/7 Virtual Consultation",
    description: "Connect with doctors anytime for real-time health advice.",
    icon: "💬",
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-green-400 py-12 px-6">
      <motion.h1
        className="text-4xl font-bold text-center text-white mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Our Services
      </motion.h1>

      <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <ServiceCard 
            key={index} 
            title={service.title} 
            description={service.description} 
            icon={service.icon} 
          />
        ))}
      </div>
    </div>
  );
};

export default Services;
