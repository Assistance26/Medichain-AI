import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const AdminSignup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/adminSignup", {
        name,
        email,
        password,
      });
      if (res.data.status === "User Already Exists") {
        alert("Admin Already Exists");
      } 
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
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Admin Sign Up</h2>
        
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-3 border rounded-md"
          required
        />
        
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-3 border rounded-md"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
