import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DoctorRegistration = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    specialization: "",
    licenseNumber: "",
    experience: "",
    publications: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => setStep(2);
  const handleBack = () => setStep(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/DoctorSignIn", formData);
      if (res.data.status === "Created Successfully") {
        alert("Account created successfully!");
        navigate("/login");
      } else {
        alert("Account already exists.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Doctor Registration {step === 1 ? "- Step 1" : "- Step 2"}
        </h2>

        {step === 1 && (
          <div>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 mb-3 border rounded focus:outline-blue-500"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 mb-3 border rounded focus:outline-blue-500"
              required
            />
            <input
              type="tel"
              name="number"
              placeholder="Phone Number"
              value={formData.number}
              onChange={handleChange}
              className="w-full p-3 mb-3 border rounded focus:outline-blue-500"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 mb-3 border rounded focus:outline-blue-500"
              required
            />
            <button
              onClick={handleNext}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
            >
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <input
              type="text"
              name="specialization"
              placeholder="Specialization"
              value={formData.specialization}
              onChange={handleChange}
              className="w-full p-3 mb-3 border rounded focus:outline-blue-500"
              required
            />
            <input
              type="text"
              name="licenseNumber"
              placeholder="License Number"
              value={formData.licenseNumber}
              onChange={handleChange}
              className="w-full p-3 mb-3 border rounded focus:outline-blue-500"
              required
            />
            <input
              type="text"
              name="experience"
              placeholder="Experience (Years)"
              value={formData.experience}
              onChange={handleChange}
              className="w-full p-3 mb-3 border rounded focus:outline-blue-500"
              required
            />
            <input
              type="text"
              name="publications"
              placeholder="Total Publications"
              value={formData.publications}
              onChange={handleChange}
              className="w-full p-3 mb-3 border rounded focus:outline-blue-500"
              required
            />

            <div className="flex justify-between">
              <button
                onClick={handleBack}
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded transition"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition"
              >
                Submit
              </button>
            </div>
          </div>
        )}

        {/* Already have an account? */}
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
};

export default DoctorRegistration;
