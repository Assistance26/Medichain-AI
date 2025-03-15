import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-400 py-16 px-6">
      <motion.h1
        className="text-5xl font-extrabold text-center text-white mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        About Us
      </motion.h1>
      
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <motion.p
          className="text-lg text-gray-700 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Welcome to our healthcare platform, where we are committed to providing innovative and accessible medical services. Our mission is to revolutionize healthcare by integrating technology, ensuring that quality medical assistance is available anytime, anywhere.
        </motion.p>

        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <motion.div 
            className="bg-blue-100 p-6 rounded-xl shadow-md text-center"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-semibold">Our Mission</h3>
            <p className="text-gray-600 mt-2">Enhancing healthcare accessibility through technology-driven solutions.</p>
          </motion.div>

          <motion.div 
            className="bg-blue-100 p-6 rounded-xl shadow-md text-center"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-semibold">Our Vision</h3>
            <p className="text-gray-600 mt-2">A future where medical support is just a click away for everyone.</p>
          </motion.div>

          <motion.div 
            className="bg-blue-100 p-6 rounded-xl shadow-md text-center"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-semibold">Our Values</h3>
            <p className="text-gray-600 mt-2">Trust, innovation, and patient-centric care at the heart of our services.</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
