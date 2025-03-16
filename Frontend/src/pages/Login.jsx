import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
// import {GlobalContext} from '../context/AppContext';
import axios from 'axios';
import { useAuth } from "../contexts/AuthContext.jsx";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { account, contract, setUserRole,setAuthUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    try {
      const isAuthenticated = await contract.methods
        .login(email, password)
        .call({ from: account });

      if (isAuthenticated) {
        const role = await contract.methods
          .getUserRole(account)
          .call({ from: account });
        setUserRole(role);
        // console.log("Role:",role);
        setAuthUser({email,role});
        
        if (role.toString().charAt(0) === "0") {
          navigate("/");
        } else if (role.toString().charAt(0) === "2") {
          navigate("/AdminDashboard");
        }
        else {
          navigate("/DoctorDashboard");
        } 
      }
        else {
          alert("Invalid email or password");
        }
      }
      catch (error) {
        console.error("Login error", error);
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
          <a href="/signup" className="text-primary underline">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;