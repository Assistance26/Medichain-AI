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
      className="relative min-h-screen flex flex-col overflow-hidden bg-gradient-to-br from-blue-200 via-blue-50 to-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-40 h-40 bg-blue-300 rounded-full opacity-20 blur-3xl top-10 left-10 animate-pulse"></div>
        <div className="absolute w-32 h-32 bg-purple-300 rounded-full opacity-20 blur-3xl bottom-20 right-10 animate-pulse"></div>
        <div className="absolute w-24 h-24 bg-blue-400 rounded-full opacity-20 blur-3xl top-1/3 left-1/2 transform -translate-x-1/2 animate-pulse"></div>
      </div>

      {/* Content */}
      <div className="px-6 py-10 relative z-10">
        <motion.h3
          className="text-4xl font-bold text-center text-blue-800"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          whileHover={{ scale: 1.05 }}
        >
          About Us
        </motion.h3>
        <motion.p
          className="mt-4 text-center text-gray-700 max-w-2xl mx-auto text-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          whileHover={{ scale: 1.02 }}
        >
          MediChanAI is an AI-powered healthcare platform dedicated to providing smart medical assistance,
          online consultations, and health tracking solutions.
        </motion.p>

        {/* Cards Section */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          {cards.map((item, index) => (
            <motion.div
              key={index}
              className="relative bg-white bg-opacity-30 backdrop-blur-lg border border-white/40 shadow-lg p-6 rounded-3xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:border-blue-400 hover:shadow-xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              {/* Soft Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-3xl"></div>

              {/* Content */}
              <div className="relative z-10 text-gray-900">
                <h4 className="text-2xl font-semibold">{item.title}</h4>
                <p className="mt-3 text-gray-700">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default About;
