import { Link } from "react-router-dom";
import { FiVideo } from "react-icons/fi";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="bg-gray-900/80 backdrop-blur-md text-white p-4 flex justify-between items-center shadow-lg fixed w-full top-0 z-50"
    >
      {/* Logo with Hover Effect */}
      <motion.h1
        className="text-2xl font-extrabold tracking-wide text-blue-400 cursor-pointer"
        whileHover={{ scale: 1.1, rotate: 3 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        MediChain AI
      </motion.h1>

      {/* Navigation Links */}
      <div className="flex space-x-6">
        {["Home", "About Us", "Services"].map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1, color: "#60a5fa" }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Link to={item === "Home" ? "/" : `/${item.toLowerCase().replace(/\s+/g, "")}`} className="hover:text-blue-400 transition-transform transform">
              {item}
            </Link>
          </motion.div>
        ))}

        {/* Video Call Button */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <Link
            to="/video-call"
            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 px-5 py-2 rounded-full shadow-lg text-white font-semibold hover:shadow-blue-400/50 transition-all transform"
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <FiVideo size={20} />
            </motion.div>
            Video Call
          </Link>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
