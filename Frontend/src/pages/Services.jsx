import ServiceCard from "../components/ServiceCard";
import { motion } from "framer-motion";

const services = [
  {
    title: "AI Symptom Checker",
    description: "Instant AI-driven analysis to assess your symptoms and suggest possible conditions.",
    icon: "🧠",
  },
  {
    title: "24/7 Doctor Consultation",
    description: "Book video consultations with top doctors anytime, anywhere.",
    icon: "👨‍⚕️",
  },
  {
    title: "Secure Health Records",
    description: "Store and access your medical records securely and conveniently.",
    icon: "🔐",
  },
  {
    title: "Emergency Ambulance Booking",
    description: "Request an ambulance anytime with real-time tracking and priority service.",
    icon: "🚑",
  },
  {
    title: "Personalized Health Insights",
    description: "Get tailored health tips and lifestyle recommendations based on your data.",
    icon: "📊",
  },
  {
    title: "Medicine Home Delivery",
    description: "Order prescribed medicines and get them delivered to your doorstep.",
    icon: "💊",
  },
  {
    title: "Mental Health Support",
    description: "Connect with certified therapists and mental health professionals.",
    icon: "🧘",
  },
  {
    title: "Fitness & Diet Plans",
    description: "Get customized fitness and nutrition plans to maintain a healthy lifestyle.",
    icon: "🏋️",
  },
  {
    title: "Vaccination Scheduling",
    description: "Book and track your vaccination appointments effortlessly.",
    icon: "💉",
  },
  {
    title: "Blood Donation Services",
    description: "Find and schedule blood donation opportunities near you.",
    icon: "🩸",
  }
];

const Services = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-400 py-16 px-6">
      <motion.h1
        className="text-4xl font-extrabold text-center text-white mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Our Healthcare Services
      </motion.h1>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {services.map((service, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <ServiceCard 
              title={service.title} 
              description={service.description} 
              icon={service.icon} 
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Services;