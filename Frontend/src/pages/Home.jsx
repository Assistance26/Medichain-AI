import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { doctors } from "../components/PopularDoctors";
import { AiOutlineRobot } from "react-icons/ai";
import { MdHealthAndSafety, MdOutlineMedicalServices } from "react-icons/md";
import { FaMoneyCheckAlt } from "react-icons/fa";

// Default avatar image URL
const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

const services = [
  {
    name: "AI Doctor",
    icon: <AiOutlineRobot className="text-4xl text-white" />,
    path: "/aidoctor",
  },
  {
    name: "Symptoms Checker",
    icon: <MdOutlineMedicalServices className="text-4xl text-white" />,
    path: "/symptom-checker",
  },
  {
    name: "Health Score",
    icon: <MdHealthAndSafety className="text-4xl text-white" />,
    path: "/health-score",
  },
  {
    name: "AI Cost Planning",
    icon: <FaMoneyCheckAlt className="text-4xl text-white" />,
    path: "/cost-planning",
  },
];

const faqs = [
  {
    question: "What is the AI Doctor?",
    answer:
      "AI Doctor is an advanced chatbot designed to provide health-related information and recommendations.",
  },
  {
    question: "How do I interact with the AI Doctor?",
    answer:
      "You can interact through our platform by entering symptoms and receiving instant insights.",
  },
  {
    question: "Is the AI Doctor a replacement for a doctor?",
    answer:
      "No, the AI Doctor provides general guidance but does not replace professional consultations.",
  },
  {
    question: "How accurate is the AI Doctor?",
    answer:
      "It offers reliable information but should not be used as a sole diagnostic tool.",
  },
  {
    question: "Is the AI Doctor available 24/7?",
    answer:
      "Yes, the AI Doctor is available 24/7, allowing you to access health assistance anytime and anywhere.",
  },
];

const Home = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const toggleFAQ = (index) => setOpenIndex(openIndex === index ? null : index);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-blue-50 to-blue-200">
      {/* Background Floating Animations */}
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        {/* Floating Blobs */}
        <motion.div
          className="absolute top-10 left-10 w-40 h-40 bg-blue-300 rounded-full opacity-50 blur-2xl"
          animate={{ x: [0, 20, -20, 0], y: [0, 15, -15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-60 h-60 bg-purple-300 rounded-full opacity-50 blur-2xl"
          animate={{ x: [0, -30, 30, 0], y: [0, -20, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto p-6">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center"
        >
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-800">
              Welcome to MediChanAI
            </h2>
            <p className="text-lg mt-2 text-gray-600">
              Your trusted AI-powered healthcare assistant.
            </p>
            <Link
              to="/login"
              className="mt-4 inline-block bg-primary text-white px-6 py-3 rounded-lg shadow-md hover:bg-accent"
            >
              Get Started
            </Link>
          </div>

          {/* Lottie Animation */}
          <motion.div
            className="w-full flex justify-center"
            whileHover={{ scale: 1.05 }}
          >
            <DotLottieReact
              src="https://lottie.host/e739f770-fa0f-466b-b697-e77a1f539593/ho02lhmGwB.lottie"
              loop
              autoplay
              className="w-full max-w-2xl"
            />
          </motion.div>
        </motion.div>

        {/* Services Section */}
        <div className="mt-10">
          <h3 className="text-xl font-semibold text-center text-gray-800">
            Services
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {services.map((service, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1 }}
                className="bg-primary text-white p-6 text-center rounded-lg shadow-md"
              >
                <Link
                  to={service.path || "#"}
                  className="flex flex-col items-center"
                >
                  {service.icon}
                  <p className="mt-2 font-semibold">{service.name}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Popular Doctors Section */}
        <div className="mt-10">
          {/* Header with "View All" button */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Popular Doctors</h3>
            <Link
              to="/doctors"
              className="text-primary font-medium hover:underline"
            >
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {doctors.slice(0, 4).map((doctor, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-4 rounded-lg shadow-md text-center"
              >
                {/* Doctor Image - Show default avatar if no image is available */}
                <img
                  src={doctor.image ? doctor.image : defaultAvatar}
                  alt={doctor.name}
                  className="w-20 h-20 object-cover rounded-full mx-auto"
                />
                <p className="mt-2 font-semibold text-primary">{doctor.name}</p>
                <p className="text-gray-600">{doctor.specialty}</p>
                <p className="text-yellow-500">
                  {"★".repeat(Math.floor(doctor.rating))}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-10 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Have questions? Let’s find answers
          </h3>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-300">
                <button
                  className="w-full flex justify-between items-center py-4 text-left text-lg font-medium"
                  onClick={() => toggleFAQ(index)}
                >
                  {faq.question}
                  <span className="text-gray-500">
                    {openIndex === index ? "▲" : "▼"}
                  </span>
                </button>
                {openIndex === index && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="pb-4 text-gray-600"
                  >
                    {faq.answer}
                  </motion.p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
