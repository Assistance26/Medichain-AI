import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { motion } from "framer-motion";

const UnifiedSignup = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
    role: "Patient",
    // Doctor specific fields
    specialization: "",
    licenseNumber: "",
    experience: "",
    publications: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.role === "Doctor") {
        const res = await axios.post('http://localhost:5000/unified-signup', {
          name: formData.name,
          email: formData.email,
          number: formData.number,
          specialization: formData.specialization,
          licenseNumber: formData.licenseNumber,
          experience: formData.experience,
          publications: formData.publications,
          password: formData.password,
          role: formData.role
        });

        if (res.data.status === "Created Successfully") {
          alert("Doctor Account Created Successfully");
          navigate('/login');
        } else if (res.data.status === "Use different password") {
          alert("Use different password");
        } else {
          alert("Account Already Exists");
        }
      } else {
        const res = await axios.post("http://localhost:5000/signup", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          number: formData.number
        });

        if (res.data.status === "User Already Exists") {
          alert("User Already Exists");
        } else if (res.data.status === "Use different password") {
          alert("Use different password");
        } else {
          alert("User Account Created");
          navigate("/login");
        }
      }
    } catch (e) {
      console.error("Error:", e);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <motion.div
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-semibold text-center mb-6">Sign Up - Step 1</h2>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Select Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="Patient">Patient</option>
                <option value="Doctor">Doctor</option>
              </select>
            </div>

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <input
              type="tel"
              name="number"
              placeholder="Phone Number"
              value={formData.number}
              onChange={handleChange}
              className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <button
              onClick={handleNext}
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Next
            </button>
          </div>
        )}

        {step === 2 && formData.role === "Doctor" && (
          <div>
            <h2 className="text-2xl font-semibold text-center mb-6">Doctor Details - Step 2</h2>

            <input
              type="text"
              name="specialization"
              placeholder="Specialization"
              value={formData.specialization}
              onChange={handleChange}
              className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <input
              type="text"
              name="licenseNumber"
              placeholder="License Number"
              value={formData.licenseNumber}
              onChange={handleChange}
              className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <input
              type="text"
              name="experience"
              placeholder="Years of Experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <input
              type="text"
              name="publications"
              placeholder="Number of Publications"
              value={formData.publications}
              onChange={handleChange}
              className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <div className="flex gap-4">
              <button
                onClick={handleBack}
                className="flex-1 bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors"
              >
                Submit
              </button>
            </div>
          </div>
        )}

        {step === 2 && formData.role === "Patient" && (
          <div>
            <h2 className="text-2xl font-semibold text-center mb-6">Review Details - Step 2</h2>
            
            <div className="space-y-4 mb-6">
              <p><strong>Name:</strong> {formData.name}</p>
              <p><strong>Email:</strong> {formData.email}</p>
              <p><strong>Phone:</strong> {formData.number}</p>
              <p><strong>Role:</strong> {formData.role}</p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleBack}
                className="flex-1 bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors"
              >
                Submit
              </button>
            </div>
          </div>
        )}

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default UnifiedSignup; 