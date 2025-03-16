import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useAuth } from "../contexts/AuthContext";

const AdminSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Admin",
  });
  const { account, contract } = useAuth();
  const roles = ["Patient", "Doctor", "Admin"];
  const navigate = useNavigate()
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password, role } = formData;

    const roleMap = {
      Patient: 0,
      Doctor: 1,
      Admin: 2,
    };

    try {
      await contract.methods
        .register(name, email, password, roleMap[role])
        .send({ from: account });
      alert("User registered successfully");
      navigate("/login")
    } catch (error) {
      console.error("Registration error", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSignup} className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Admin Sign Up</h2>
        
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded-md"
          required
        />
        
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
          Sign Up
        </button>

        <p className="text-center mt-3 text-sm">
          Already have an account? {" "}
          <a href="/login" className="text-primary underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default AdminSignup;
