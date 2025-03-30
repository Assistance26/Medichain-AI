import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ChatbotContext } from "../context/ChatbotContext"; // ✅ Chatbot Context
import { useAuth } from "../context/AuthContext"; // ✅ Corrected Import

const DoctorLogin = () => {
  const { user, setUser } = useContext(ChatbotContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [doctor, setDoctor] = useState(null);
  const navigate = useNavigate();

  // ✅ Use useAuth instead of useUser
  const { handleSetUser } = useAuth(); 

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get("http://localhost:5000/login", {
        params: { email, password },
      });

      if (res.data.status === "Doctor found") {
        console.log(res.data.user);
        setDoctor(res.data.user);

        // ✅ Set Doctor Role and Redirect to Dashboard
        handleSetUser({ email, role: "Doctor" });
        navigate("/DoctorDashboard", { state: { doctor: res.data.user } });
      } else {
        console.log("Doctor doesn't exist");
        alert("Email or password incorrect");
      }
    } catch (e) {
      console.log("Error:", e);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-2xl font-semibold text-center mb-4">Doctor Login</h2>

        {/* Email Input */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-3 border rounded-md"
          required
        />

        {/* Password Input */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-3 border rounded-md"
          required
        />

        {/* Login Button */}
        <button
          type="submit"
          className="bg-primary text-white w-full p-2 rounded-md"
        >
          Login
        </button>

        {/* Sign Up Redirect */}
        <p className="text-center mt-3 text-sm">
          Don't have an account?{" "}
          <a href="/DoctorRegistration" className="text-primary underline">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
};

export default DoctorLogin;
