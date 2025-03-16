<<<<<<< HEAD
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {GlobalContext} from '../context/AppContext';
import axios from 'axios';

const Login = () => {
  const {user, setUser} = useContext(GlobalContext);
  const [name, setName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

=======
import { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {ChatbotContext} from '../context/ChatbotContext';

const Login = () => {
  const {user,setUser} = useContext(ChatbotContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [doctor, setDoctor] = useState();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
>>>>>>> 0c04fbbb3e00a2fbaa36098485eeb6de2f247715
    try {
      const res = await axios.get("http://localhost:5000/login", {
        params:{email,password}
      });
<<<<<<< HEAD

      if (res.data.status === "User found") {
        console.log("User:", res.data.user);
        setUser(res.data.user);
        navigate('/');
      } else if (res.data.status === "Doctor found") {
        console.log("Doctor:", res.data.user);
        
        navigate('/DoctorDashboard', { state: { doctor: res.data.user } });
      } else {
        console.log("User doesn't exist");
        alert("Email or password incorrect");
      }
    } catch (e) {
      console.log("Error:", e);
=======
      if(res.data.status === "User found"){
      console.log(res.data.user);
      setUser(res.data.user);
      navigate('/');
      }
      else if(res.data.status === "Doctor found"){
        console.log(res.data.user);
        setDoctor(res.data.user);
      navigate('/DoctorDashboard',{state: { doctor: res.data.user } });
      }
      else if(res.data.status === "Admin found"){
        console.log(res.data.user);
      navigate('/AdminDashboard',{state: { admin: res.data.user } });
      }
      else{
      console.log("User doesn't exists");
      alert("Email or password incorrect");
      }
    }
    catch(e){
        console.log("error:",e);
>>>>>>> 0c04fbbb3e00a2fbaa36098485eeb6de2f247715
    }
  };
  
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
        <input
          type="name"
          name="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-3 border rounded-md"
          required
        />

        <input
          type="name"
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
