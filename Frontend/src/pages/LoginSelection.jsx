import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
=======
import { motion } from "framer-motion";
>>>>>>> 0c04fbbb3e00a2fbaa36098485eeb6de2f247715

const LoginSelection = () => {
  const navigate = useNavigate();

  return (
<<<<<<< HEAD
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          className="bg-white p-6 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition transform hover:scale-105"
          onClick={() => navigate("/DoctorRegistration")}
        >
          <h2 className="text-2xl font-semibold text-center mb-4">Sign in as Doctor</h2>
          <p className="text-center text-gray-600">Access your medical dashboard</p>
        </div>

        <div
          className="bg-white p-6 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition transform hover:scale-105"
          onClick={() => navigate("/Signup")}
        >
          <h2 className="text-2xl font-semibold text-center mb-4">Sign in as Patient</h2>
          <p className="text-center text-gray-600">Manage your health records</p>
        </div>
=======
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100 px-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Welcome! How would you like to continue?
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl w-full">
        {[
          {
            title: "Sign in as Doctor",
            description: "Access your medical dashboard",
            onClick: () => navigate("/DoctorRegistration"),
          },
          {
            title: "Sign in as Patient",
            description: "Manage your health records",
            onClick: () => navigate("/Signup"),
          },
          {
            title: "Sign in as Admin",
            description: "Manage system users and data",
            onClick: () => navigate("/AdminSignup"),
          },
        ].map((item, index) => (
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
>>>>>>> 0c04fbbb3e00a2fbaa36098485eeb6de2f247715
      </div>
    </div>
  );
};

export default LoginSelection;
