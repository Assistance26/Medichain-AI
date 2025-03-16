import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const LoginSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100 px-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Welcome! How would you like to continue?</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-lg w-full">
        {[{
          title: "Sign in as Doctor",
          description: "Access your medical dashboard",
          onClick: () => navigate("/DoctorRegistration"),
        }, {
          title: "Sign in as Patient",
          description: "Manage your health records",
          onClick: () => navigate("/login"),
        }].map((item, index) => (
          <motion.div
            key={index}
            className="bg-white bg-opacity-20 backdrop-blur-lg p-8 rounded-2xl shadow-lg cursor-pointer text-gray-800 text-center border border-gray-300 hover:bg-opacity-30 transition"
            onClick={item.onClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <h2 className="text-2xl font-semibold mb-4">{item.title}</h2>
            <p className="text-gray-600">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LoginSelection;
