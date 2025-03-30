import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const AdminSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Admin",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    try {
      const res = await axios.post("http://localhost:5000/adminSignup", {
        name,
        email,
        password,
      });

      if (res.data.status === "User Already Exists") {
        alert("Admin Already Exists");
      } 
      else if(res.data.status === "Use different password")
        alert("Use different password");
      else {
        alert("Admin Account Created");
        console.log(res.data.admin);
        navigate("/login");
      }
    } catch (e) {
      console.error("Signup Error:", e);
      alert("An error occurred. Please try again.");
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

        <button type="submit" className="bg-blue-500 text-white w-full p-2 rounded-md">
          Sign Up
        </button>

        <p className="text-center mt-3 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default AdminSignup;
