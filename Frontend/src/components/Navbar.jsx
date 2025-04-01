
import { useAuth } from "../context/AuthContext"; // ✅ Use the custom hook
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { user, handleRemoveUser } = useAuth(); // ✅ Fix: Use the hook

  const handleLogout = () => {
    handleRemoveUser();
    navigate("/");
    setIsOpen(false); // Close menu after logout
  };

  const links = ["Home", "About", "Services", "Doctors", "Appointment", "Contact", "Policies", "My-policies", "Connect-wallet"];

  return (
    <motion.nav
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-blue-800 via-purple-700 to-indigo-800 text-white shadow-xl ${
        isOpen ? "pb-10" : ""
      }`}
    >
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
      <Link
      to="/"
      className="text-3xl font-extrabold tracking-wider text-white transition-all duration-300 relative group"
    >
      {/* Glow-Up Effect with Radiant Pulse */}
      <span
        className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-100 blur-2xl rounded-full transition-all duration-500 animate-ping group-hover:animate-none"
      ></span>

      {/* Glow-Up Border Effect */}
      <span
        className="absolute inset-0 border-2 border-yellow-400 opacity-0 group-hover:opacity-100 rounded-lg transition-all duration-300 group-hover:scale-110"
      ></span>

      {/* Main Text with Multi-Step Hover Effect */}
      <motion.span
        initial={{ scale: 1, rotate: 0 }}
        whileHover={{
          scale: 1.15,
          rotate: -3,
          textShadow: "0px 0px 8px rgba(255, 223, 88, 1)",
          transition: { type: "spring", stiffness: 250, damping: 12 },
        }}
        className="relative group-hover:text-yellow-300 group-hover:tracking-widest transition-all duration-300"
      >
        🩺 MediChainAI
      </motion.span>

      {/* Subtle Underline Effect */}
      <span
        className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-yellow-400 group-hover:w-full group-hover:left-0 transition-all duration-300"
      ></span>
    </Link>



        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {links.map((item) => (
            <Link
              key={item}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="text-sm font-semibold relative group"
            >
              <span className="text-white transition-all duration-300 group-hover:text-yellow-400">
                {item}
              </span>
              {/* Bottom Border Animation */}
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}

          {user ? (
            <motion.button
              onClick={handleLogout}
              className="bg-red-500 px-5 py-2 rounded-lg shadow-lg text-white font-semibold transition-all duration-300 hover:bg-red-600 hover:scale-105 hover:shadow-red-500/50 active:scale-95"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Logout
            </motion.button>
          ) : (
            <Link
              to="/LoginSelection"
              className="bg-blue-500 px-5 py-2 rounded-lg shadow-lg text-white font-semibold transition-all duration-300 hover:bg-blue-600 hover:shadow-blue-500/50 hover:scale-105 active:scale-95"
            >
               Signup
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? (
            <X size={28} className="text-white hover:text-yellow-400 transition-all duration-300" />
          ) : (
            <Menu size={28} className="text-white hover:text-yellow-400 transition-all duration-300" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-gradient-to-b from-white via-gray-100 to-gray-300 text-black absolute top-16 left-0 w-full py-4 shadow-xl border-t"
          >
            <div className="flex flex-col items-center space-y-4">
              {links.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: 0.05 * index }}
                >
                  <Link
                    to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    onClick={() => setIsOpen(false)}
                    className="text-black font-medium transition-all duration-300 hover:text-blue-600 hover:scale-105"
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}

              {user ? (
                <motion.button
                  onClick={handleLogout}
                  className="bg-red-500 px-5 py-2 rounded-lg shadow-md text-white transition-all duration-300 hover:bg-red-600 hover:shadow-red-500/50 hover:scale-105"
                >
                  Logout
                </motion.button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="bg-gray-200 px-5 py-2 rounded-lg text-black transition-all duration-300 hover:bg-gray-300 hover:text-blue-600 hover:scale-105"
                >
                   Signup
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
