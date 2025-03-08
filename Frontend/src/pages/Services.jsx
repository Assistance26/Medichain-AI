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
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-green-500 py-12 px-6 flex flex-col items-center">
      {/* Title Animation */}
      <motion.h1
        className="text-4xl font-bold text-center text-white mb-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        whileHover={{ scale: 1.05, textShadow: "0px 0px 10px rgba(255,255,255,0.8)" }}
      >
        Our Services
      </motion.h1>

      {/* Services Grid with Staggered Animation */}
      <motion.div
        className="grid sm:grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: { staggerChildren: 0.2 } 
          },
        }}
      >
        {services.map((service, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <ServiceCard 
              title={service.title} 
              description={service.description} 
              icon={service.icon} 
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Services;
