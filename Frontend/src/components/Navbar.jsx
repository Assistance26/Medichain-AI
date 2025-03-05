import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react"; // Icon for hamburger menu

const Navbar = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu

  useEffect(() => {
    setIsAuthenticated(localStorage.getItem("isAuthenticated") === "true");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
    navigate("/");
    setIsOpen(false); // Close menu after logout
  };

  const links = ["Home", "About", "Services", "Doctors", "Appointment", "Contact"];

  return (
    <motion.nav initial={{ y: -50 }} animate={{ y: 0 }} className="bg-primary text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <h1 className="text-lg font-semibold">MediChanAI</h1>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {links.map((item) => (
            <Link
              key={item}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="text-sm font-medium hover:text-accent transition-all duration-200"
            >
              {item}
            </Link>
          ))}
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 text-sm rounded-md shadow-sm hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="bg-white text-primary px-4 py-2 text-sm rounded-md shadow-sm hover:bg-gray-200">
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-primary text-white absolute top-16 left-0 w-full py-4 shadow-lg"
          >
            <div className="flex flex-col items-center space-y-4">
              {links.map((item) => (
                <Link
                  key={item}
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="text-sm font-medium hover:text-accent transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </Link>
              ))}
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 text-sm rounded-md shadow-sm hover:bg-red-600"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="bg-white text-primary px-4 py-2 text-sm rounded-md shadow-sm hover:bg-gray-200"
                  onClick={() => setIsOpen(false)}
                >
                  Login
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
