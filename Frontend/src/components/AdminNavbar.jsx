import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // Icons for mobile menu
import { motion, AnimatePresence } from "framer-motion";

const AdminNavbar = () => {
  const { user, handleRemoveUser } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    handleRemoveUser();
    navigate("/LoginSelection"); // Redirect to login selection
    setIsOpen(false); // Close menu after logout
  };

  return (
    <nav className="bg-primary text-white py-4 px-6 flex justify-between items-center shadow-md relative z-50">
      <h1 className="text-xl font-bold">MediChainAI</h1>
      
      {/* Mobile Menu Button */}
      <button
        className="md:hidden z-50"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Menu"
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Desktop Navigation */}
      <div className="hidden md:flex md:space-x-6">
        <Link
          to="/AdminDashboard"
          className="px-4 py-2 transition-all duration-300 transform hover:scale-105 hover:text-blue-300"
        >
          Dashboard
        </Link>
        {user && (
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded transition-all duration-300 transform hover:scale-105 hover:bg-red-600"
          >
            Logout
          </button>
        )}
      </div>

      {/* Mobile Navigation with Framer Motion */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-16 left-0 w-full bg-white/10 backdrop-blur-2xl shadow-lg border-t border-white/20 py-6 z-40"
          >
            <div className="flex flex-col items-center space-y-6">
              <Link
                to="/AdminDashboard"
                className="text-lg font-medium hover:text-blue-500 transition-all duration-200 text-black hover:scale-105"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
              {user && (
                <button
                  onClick={handleLogout}
                  className="bg-red-500 px-6 py-2 rounded transition-all duration-300 transform hover:scale-105 hover:bg-red-600 text-white"
                >
                  Logout
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default AdminNavbar;
