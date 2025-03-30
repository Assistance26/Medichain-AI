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

  const links = ["Home", "About", "Services", "Doctors", "Appointment", "Contact"];

  return (
    <motion.nav initial={{ y: -50 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 w-full z-50 bg-primary text-white shadow-lg ${isOpen ? "pb-10" : ""}`}
    >
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <h1 className="text-lg font-semibold">MediChainAI</h1>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {links.map((item) => (
            <Link key={item} to={item === "Home" ? "/" : `/${item.toLowerCase()}`} className="text-sm font-medium">
              {item}
            </Link>
          ))}
          {user ? (
            <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded-md">
              Logout
            </button>
          ) : (
            <Link to="/LoginSelection" className="bg-white px-4 py-2 rounded-md">Signup</Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? <X size={28} className="text-white" /> : <Menu size={28} className="text-white" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-white text-black absolute top-16 left-0 w-full py-4 shadow-lg border-t"
          >
            <div className="flex flex-col items-center space-y-4">
              {links.map((item) => (
                <Link key={item} to={item === "Home" ? "/" : `/${item.toLowerCase()}`} onClick={() => setIsOpen(false)}>
                  {item}
                </Link>
              ))}
              {user ? (
                <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded-md">Logout</button>
              ) : (
                <Link to="/login" className="bg-white px-4 py-2 rounded-md" onClick={() => setIsOpen(false)}>Signup</Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
