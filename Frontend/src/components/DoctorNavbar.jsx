import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // Icons for mobile menu
import { motion, AnimatePresence } from "framer-motion";

const DoctorNavbar = () => {
  const { user, handleRemoveUser } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    handleRemoveUser();
    localStorage.removeItem("user"); // ✅ Ensure user is removed
    navigate("/LoginSelection");
    setIsOpen(false); // Close menu after logout
  };
  

  return (
    <nav className="bg-blue-700 text-white p-4 flex justify-between items-center relative z-50">
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
          to="/dashboard"
          className="px-4 py-2 transition-all duration-300 transform hover:scale-105 hover:text-blue-300"
        >
          Dashboard
        </Link>
        <Link
          to="/appointments"
          className="px-4 py-2 transition-all duration-300 transform hover:scale-105 hover:text-blue-300"
        >
          Upcoming Appointments
        </Link>
        {user ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded transition-all duration-300 transform hover:scale-105 hover:bg-red-600"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/signup"
            className="bg-green-500 px-4 py-2 rounded transition-all duration-300 transform hover:scale-105 hover:bg-green-600"
          >
            Signup
          </Link>
        )}
      </div>
    </nav>
  );
};

export default DoctorNavbar;
