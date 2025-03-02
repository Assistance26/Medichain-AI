import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react"; // For mobile menu icon

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/aboutus" },
  { name: "Services", path: "/services" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="bg-gray-900/80 backdrop-blur-md text-white p-4 flex justify-between items-center shadow-lg fixed w-full top-0 z-50"
    >
      {/* Logo */}
      <motion.h1
        className="text-2xl font-extrabold tracking-wide text-blue-400 cursor-pointer"
        whileHover={{ scale: 1.1, rotate: 3 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        MediChain AI
      </motion.h1>

      {/* Desktop Navigation */}
      <div className="hidden md:flex space-x-6 items-center">
        {navLinks.map(({ name, path }, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1, color: "#60a5fa" }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Link
              to={path}
              className="hover:text-blue-400 transition-transform transform"
              aria-label={name}
            >
              {name}
            </Link>
          </motion.div>
        ))}

        {/* Login/Signup Button */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/login"
            className="bg-gradient-to-r from-green-500 to-blue-500 px-5 py-2 rounded-full shadow-lg text-white font-semibold hover:shadow-green-400/50 transition-all"
            aria-label="Login or Signup"
          >
            Login / Signup
          </Link>
        </motion.div>
      </div>

      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden text-white focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation"
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute top-16 left-0 w-full bg-gray-900/90 backdrop-blur-lg text-center py-4 flex flex-col space-y-4 shadow-lg md:hidden"
          >
            {navLinks.map(({ name, path }, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1, color: "#60a5fa" }}
                transition={{ type: "spring", stiffness: 200 }}
                onClick={() => setIsOpen(false)} // Close menu on click
              >
                <Link
                  to={path}
                  className="text-white text-lg hover:text-blue-400"
                  aria-label={name}
                >
                  {name}
                </Link>
              </motion.div>
            ))}

            {/* Login/Signup Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/login"
                className="bg-gradient-to-r from-green-500 to-blue-500 px-5 py-2 rounded-full shadow-lg text-white font-semibold hover:shadow-green-400/50 transition-all"
                aria-label="Login or Signup"
              >
                Login / Signup
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
