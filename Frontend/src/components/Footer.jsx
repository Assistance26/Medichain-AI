import { motion } from "framer-motion";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <motion.footer
      className="bg-gray-900 text-white py-8 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-5xl mx-auto px-4">
        {/* Top Section */}
        <div className="grid md:grid-cols-3 gap-6 pb-6 border-b border-gray-700">
          {/* Logo & Info */}
          <div>
            <h2 className="text-3xl font-bold text-blue-400">MediChain AI</h2>
            <p className="text-gray-400 mt-2">
              Revolutionizing healthcare with AI-powered solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="mt-2 space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-blue-400 transition">Home</a></li>
              <li><a href="/about" className="hover:text-blue-400 transition">About Us</a></li>
              <li><a href="/services" className="hover:text-blue-400 transition">Services</a></li>
              <li><a href="/contact" className="hover:text-blue-400 transition">Contact</a></li>
            </ul>
          </div>

          {/* Social Media Icons */}
          <div>
            <h3 className="text-lg font-semibold text-white">Follow Us</h3>
            <div className="flex justify-center space-x-4 mt-2">
              <motion.a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                className="text-gray-400 hover:text-blue-500 transition"
              >
                <FaFacebook size={24} />
              </motion.a>
              <motion.a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                className="text-gray-400 hover:text-blue-500 transition"
              >
                <FaTwitter size={24} />
              </motion.a>
              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                className="text-gray-400 hover:text-pink-500 transition"
              >
                <FaInstagram size={24} />
              </motion.a>
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                className="text-gray-400 hover:text-blue-700 transition"
              >
                <FaLinkedin size={24} />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <p className="text-gray-500 text-sm mt-6">© 2025 MediChain AI. All rights reserved.</p>
      </div>
    </motion.footer>
  );
};

export default Footer;

