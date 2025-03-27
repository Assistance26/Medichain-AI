import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react"; // Icon for hamburger menu
// import { useAuth } from "../contexts/AuthContext";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu
  // const { authUser,setAuthUser } = useAuth();
  const { user, handleRemoveUser} = useAuth();


  // useEffect(() => {
  //   setIsAuthenticated(localStorage.getItem("isAuthenticated") === "true");
  // }, []);

  const handleLogout = () => {
    // localStorage.removeItem("isAuthenticated");
    // setIsAuthenticated(false);
    handleRemoveUser();
    navigate("/");
    setIsOpen(false); // Close menu after logout
  };

  const links = ["Home", "About", "Services", "Doctors", "Appointment", "Contact"];

  return (
    <motion.nav
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 w-full z-50 bg-primary text-white shadow-lg ${isOpen ? "pb-10" : ""}`}
    >
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <h1 className="text-lg font-semibold text-shadow-md transition-all duration-500 transform hover:scale-110 hover:text-accent hover:animate-text-glow">
          <span className="text-gradient">MediChainAI</span>
        </h1>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {links.map((item) => (
            <Link
              key={item}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="text-sm font-medium transition-all duration-300 text-shadow-md hover:text-accent hover:scale-105 hover:opacity-80 hover:tracking-wide relative"
            >
              {item}
              <motion.div
                className="absolute bottom-0 left-0 w-full h-[2px] bg-accent scale-x-0 origin-left transition-all duration-300 group-hover:scale-x-100"
              />
            </Link>
          ))}
          {!(user == null) ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 text-sm rounded-md shadow-md hover:bg-red-600 hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Logout
            </button>
          ) : (
            <Link to="/LoginSelection" className="bg-white text-primary px-4 py-2 text-sm rounded-md shadow-sm hover:bg-gray-200">
              Signup
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden z-50">
          {isOpen ? <X size={28} className="text-white" /> : <Menu size={28} className="text-white" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-white/10 backdrop-blur-lg text-black absolute top-16 left-0 w-full py-4 shadow-lg border-t border-white/20 z-50"
          >
            <div className="flex flex-col items-center space-y-4">
              {links.map((item) => (
                <Link
                  key={item}
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="text-sm font-medium hover:text-accent transition-all duration-200 text-black text-shadow-md hover:scale-105 hover:tracking-wide"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-accent scale-x-0 origin-left transition-all duration-300 group-hover:scale-x-100"
                  />
                </Link>
              ))}
              {!(user == null) ? (
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 text-sm rounded-md shadow-md hover:bg-red-600 hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="bg-white text-primary px-4 py-2 text-sm rounded-md shadow-md hover:bg-gray-200 hover:shadow-xl hover:scale-105 transition-all duration-300"
                  onClick={() => setIsOpen(false)}
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
