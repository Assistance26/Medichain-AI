import { motion } from "framer-motion";

const Contact = () => {
  return (
    <motion.div
      className="container mx-auto p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h2 className="text-3xl font-bold text-center">Contact Us</h2>
      <form className="mt-6 max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        <label className="block mb-2">Email</label>
        <input type="email" className="w-full p-2 border rounded-md mb-4" />
        <label className="block mb-2">Message</label>
        <textarea className="w-full p-2 border rounded-md mb-4"></textarea>
        <button type="submit" className="w-full bg-primary text-white p-2 rounded-lg">Send Message</button>
      </form>
    </motion.div>
  );
};

export default Contact;
