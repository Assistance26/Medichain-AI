import { motion } from "framer-motion";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"; // Updated Twitter to X

const Footer = () => {
  return (
    <motion.footer
      className="bg-gray-900 text-white py-10 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Top Section */}
        <div className="grid md:grid-cols-4 gap-8 pb-8 border-b border-gray-700">
          {/* Logo & Info */}
          <div className="text-left">
            <h2 className="text-3xl font-bold text-blue-400">MediChain AI</h2>
            <p className="text-gray-400 mt-3">
              Revolutionizing healthcare with AI-powered solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-left">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="mt-3 space-y-2 text-gray-400">
              <li>
                <a
                  href="/"
                  className="hover:text-blue-400 hover:underline transition duration-200"
                >
                  Home
                </a>
              </li>
              {["About Us", "Services", "Contact"].map((item, index) => (
                <li key={index}>
                  <a
                    href={`/${item.toLowerCase().replace(" ", "")}`}
                    className="hover:text-blue-400 hover:underline transition duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media Icons */}
          <div className="text-left">
            <h3 className="text-lg font-semibold text-white">Follow Us</h3>
            <div className="flex space-x-4 mt-3">
              {[
                { icon: FaFacebook, link: "https://facebook.com", color: "blue-500" },
                { icon: FaXTwitter, link: "https://twitter.com", color: "white" }, // Updated to X (Twitter)
                { icon: FaInstagram, link: "https://instagram.com", color: "pink-500" },
                { icon: FaLinkedin, link: "https://linkedin.com", color: "blue-700" },
              ].map(({ icon: Icon, link, color }, index) => (
                <motion.a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className={`text-gray-400 hover:text-${color} transition duration-200`}
                >
                  <Icon size={28} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="text-left">
            <h3 className="text-lg font-semibold text-white">Stay Updated</h3>
            <p className="text-gray-400 mt-2">Subscribe to our newsletter.</p>
            <div className="flex mt-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 text-gray-900 rounded-l-md focus:outline-none"
              />
              <button className="bg-blue-500 px-4 py-2 rounded-r-md text-white font-semibold hover:bg-blue-600 transition duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <p className="text-gray-500 text-sm mt-6">
          © 2025 MediChain AI. All rights reserved.
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
