import { motion } from "framer-motion";

const About = () => {
  const cards = [
    {
      title: "Our Mission",
      description: "To make healthcare accessible, affordable, and intelligent through AI-driven technology.",
    },
    {
      title: "Why Choose Us?",
      description: "With cutting-edge AI, we provide instant medical insights, reliable symptom checking, and seamless doctor consultations.",
    },
    {
      title: "Our Vision",
      description: "We aim to revolutionize digital healthcare by integrating AI, telemedicine, and health analytics.",
    },
    {
      title: "Our Values",
      description: "We prioritize innovation, trust, and patient-centric care to build a smarter healthcare system.",
    },
  ];

  return (
    <motion.div
      className="min-h-screen flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Main Content */}
      <div className="flex-grow px-6 py-6">
        <motion.h3
          className="text-2xl font-bold text-center text-primary"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          About Us
        </motion.h3>
        <motion.p
          className="mt-4 text-center text-gray-700 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          MediChanAI is an AI-powered healthcare platform dedicated to providing smart medical assistance,
          online consultations, and health tracking solutions.
        </motion.p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((item, index) => (
            <motion.div
              key={index}
              className="bg-primary text-white p-6 rounded-2xl shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 + index * 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <h4 className="text-xl font-semibold">{item.title}</h4>
              <p className="mt-2">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer - Positioned at the Bottom with Animation */}
      <motion.footer
        className="bg-gray-800 text-white text-center py-4 mt-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <p>© 2025 MediChanAI. All rights reserved.</p>
      </motion.footer>
    </motion.div>
  );
};

export default About;
