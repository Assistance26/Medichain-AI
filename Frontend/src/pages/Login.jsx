import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../context/AuthContext"; // Use correct context

const Login = () => {
  const { handleSetUser } = useUser(); // Assuming handleSetUser updates user context
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    try {
      const res = await axios.get("http://localhost:5000/login", {
        params: { email, password },
      });

      if (res.data.status === "User found") {
        localStorage.setItem("token", res.data.token);
        console.log("User:", res.data.user);
        handleSetUser(res.data.user);
        navigate("/");
      } else if (res.data.status === "Doctor found") {
        localStorage.setItem("token", res.data.token);
        console.log("Doctor:", res.data.user);
        navigate("/DoctorDashboard", { state: { doctor: res.data.user } });
      } else if (res.data.status === "Admin found") {
        localStorage.setItem("token", res.data.token);
        console.log("Admin:", res.data.user);
        navigate("/AdminDashboard", { state: { admin: res.data.user } });
      } else {
        console.log("User doesn't exist");
        alert("Email or password incorrect");
      }
    } catch (e) {
      console.error("Error:", e);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded-md"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded-md"
          required
        />

        <button type="submit" className="bg-primary text-white w-full p-2 rounded-md">
          Login
        </button>

        <p className="text-center mt-3 text-sm">
          Don't have an account?{" "}
          <a href="/LoginSelection" className="text-primary underline">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;