// import { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useUser } from "../context/AuthContext";
// import { motion } from "framer-motion";

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const { handleSetUser } = useUser();
//   const navigate = useNavigate();

//   // Handle Input Changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle Login
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     const { email, password } = formData;

//     try {
//       const res = await axios.get("http://localhost:5000/login", {
//         params: { email, password },
//       });

//       if (res.data.status === "User found") {
//         console.log("User:", res.data.user);
//         handleSetUser(res.data.user);
//         navigate("/");
//       } else if (res.data.status === "Doctor found") {
//         console.log("Doctor:", res.data.user);

//         // Set doctor role and navigate to dashboard
//         handleSetUser({ name: res.data.user.name, email, role: "doctor" });
//         navigate("/dashboard", { state: { doctor: res.data.user } });
//       } 
//       else if (res.data.status === "Admin found") {
//         console.log("Admin:", res.data.user);

//         // Set doctor role and navigate to dashboard
//         handleSetUser({ name: res.data.user.name, email, role: "admin" });
//         navigate("/AdminDashboard", { state: { admin: res.data.user } });
//       } 
//       else {
//         console.log("User doesn't exist");
//         alert("Email or password incorrect");
//       }
//     } catch (e) {
//       console.log("Error:", e);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
//       {/* Main Card with Motion */}
//       <motion.div
//         className="bg-white p-8 rounded-3xl shadow-2xl w-96 relative z-10 overflow-hidden"
//         initial={{ y: 50, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.5, ease: "easeOut" }}
//       >
//         <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
//           Login to Your Account
//         </h2>

//         {/* Form */}
//         <form onSubmit={handleLogin} className="space-y-5">
//           {/* Email Field */}
//           <motion.input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
//             whileFocus={{ scale: 1.02 }}
//             required
//           />

//           {/* Password Field */}
//           <motion.input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
//             whileFocus={{ scale: 1.02 }}
//             required
//           />

//           {/* Login Button with Ripple Effect */}
//           <motion.button
//             type="submit"
//             className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-lg shadow-lg hover:from-purple-600 hover:to-pink-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             Login
//           </motion.button>
//         </form>

//         {/* Signup Redirect */}
//         <p className="text-center text-sm text-gray-600 mt-4">
//           Don't have an account?{" "}
//           <a href="/LoginSelection" className="text-primary underline">
//             Sign Up
//           </a>
//         </p>
//       </motion.div>

//       {/* Background Decorative Circles */}
//       <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
//       <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
//     </div>
//   );
// };

// export default Login;


import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ChatbotContext } from "../context/ChatbotContext";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { doctorState, setDoctorState } = useContext(ChatbotContext);
  const { handleSetUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    try {
      const res = await axios.get("http://localhost:5000/login", {
        params: { email, password },
      });

      if (res.data.status === "User found") {
        console.log("User:", res.data.user);

        // Set user role and navigate to home
        handleSetUser({ name: res.data.user.name, email, role: "user" });
        localStorage.setItem(
          "userState",
          JSON.stringify({ name: res.data.user.name, email, role: "user" })
        );
        navigate("/");
      } else if (res.data.status === "Doctor found") {
        console.log("Doctor:", res.data.user);

        // Set doctor role, store in localStorage, and navigate to dashboard
        const doctorData = { ...res.data.user, role: "doctor" };
        handleSetUser(doctorData);
        localStorage.setItem("doctorState", JSON.stringify(doctorData));
        setDoctorState(doctorData); // Ensure state is updated in context

        navigate("/dashboard");
      } else if (res.data.status === "Admin found") {
        console.log("Admin:", res.data.user);

        // Set admin role, store in localStorage, and navigate to Admin Dashboard
        const adminData = { ...res.data.user, role: "admin" };
        handleSetUser(adminData);
        localStorage.setItem("adminState", JSON.stringify(adminData));
        setDoctorState(adminData);

        navigate("/AdminDashboard");
      } else {
        console.log("User doesn't exist");
        alert("Email or password incorrect");
      }
    } catch (e) {
      console.error("Login error:", e);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
      {/* Main Card with Motion */}
      <motion.div
        className="bg-white p-8 rounded-3xl shadow-2xl w-96 relative z-10 overflow-hidden"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login to Your Account
        </h2>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email Field */}
          <motion.input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            whileFocus={{ scale: 1.02 }}
            required
          />

          {/* Password Field */}
          <motion.input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            whileFocus={{ scale: 1.02 }}
            required
          />

          {/* Login Button with Ripple Effect */}
          <motion.button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-lg shadow-lg hover:from-purple-600 hover:to-pink-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.button>
        </form>

        {/* Signup Redirect */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-blue-500 hover:underline transition-all duration-300"
          >
            Sign Up
          </a>
        </p>
      </motion.div>

      {/* Background Decorative Circles */}
      <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
    </div>
  );
};

export default Login;
