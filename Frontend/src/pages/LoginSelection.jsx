import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const LoginSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col justify-center items-center h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 animate-gradient px-6 overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 animate-gradient opacity-30"></div>

      {/* Heading with Fade-in Animation */}
      <motion.h1
        className="text-4xl font-extrabold text-white mb-8 text-center drop-shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Welcome! How would you like to continue?
      </motion.h1>

      {/* Selection Cards with Enhanced UI */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl w-full">
        {[
          {
            title: "Sign Up",
            description: "Register as Patient or Doctor",
            onClick: () => navigate("/unified-signup"),
          },
          {
            title: "Sign Up as Admin",
            description: "Manage system users and data",
            onClick: () => navigate("/AdminSignup"),
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            className="relative bg-white/20 backdrop-blur-xl p-8 rounded-3xl shadow-xl cursor-pointer text-gray-800 text-center border border-gray-300 hover:bg-opacity-30 transition-all duration-300 group overflow-hidden"
            onClick={item.onClick}
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 25px rgba(255, 255, 255, 0.6)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Card Content */}
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4 text-gray-900 group-hover:text-gray-700 transition-colors">
                {item.title}
              </h2>
              <p className="text-gray-600 text-lg">{item.description}</p>
            </div>

            {/* Animated Shine Effect on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </motion.div>
        ))}
      </div>

      {/* Decorative Glowing Circles */}
      <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-pulse"></div>
    </div>
  );
};

export default LoginSelection;
