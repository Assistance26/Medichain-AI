// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from 'axios';

// const DoctorRegistration = () => {
//   const [step, setStep] = useState(1);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [number, setNumber] = useState("");
//   const [specialization, setSpecialization] = useState("");
//   const [licenseNumber, setLicenceNumber] = useState("");
//   const [experience, setExperience] = useState("");
//   const [publications, setPublications] = useState("");
//   const [password, setPassword] = useState("");

//   const navigate = useNavigate();

//   const handleNext = () => {
//     setStep(2);
//   };

//   const handleBack = () => {
//     setStep(1);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try{
//       const res = await axios.post('http://localhost:5000/DoctorSignUp',{
//         name,email,number,specialization, licenseNumber, experience, publications, password
//       });
//       if(res.data.status=="Created Successfully"){
//        alert("Account created Succesfully");
//        console.log(res.data.doctor);
//        navigate('/login');
//       }
//       else if(res.data.status === "Use different password")
//         alert("Use different password");
//       else
//       alert("Account Already Exists");
//     }
//     catch(e){
//       console.log("Error:",e);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-96">
//         {step === 1 && (
//           <div>
//             <h2 className="text-2xl font-semibold text-center mb-4">Doctor Registration - Step 1</h2>
//             <input
//               type="text"
//               name="name"
//               placeholder="Full Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="w-full p-2 mb-3 border rounded"
//               required
//             />
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full p-2 mb-3 border rounded"
//               required
//             />
//             <input
//               type="tel"
//               name="phone"
//               placeholder="Phone Number"
//               value={number}
//               onChange={(e) => setNumber(e.target.value)}
//               className="w-full p-2 mb-3 border rounded"
//               required
//             />
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-2 mb-3 border rounded"
//               required
//             />
//             <button onClick={handleNext} className="w-full bg-blue-500 text-white py-2 rounded">Next</button>
//           </div>
//         )}

//         {step === 2 && (
//           <div>
//             <h2 className="text-2xl font-semibold text-center mb-4">Doctor Registration - Step 2</h2>
//             <input
//               type="text"
//               name="specialization"
//               placeholder="Specialization"
//               value={specialization}
//               onChange={(e) => setSpecialization(e.target.value)}
//               className="w-full p-2 mb-3 border rounded"
//               required
//             />
//             <input
//               type="text"
//               name="licenseNumber"
//               placeholder="License Number"
//               value={licenseNumber}
//               onChange={(e) => setLicenceNumber(e.target.value)}
//               className="w-full p-2 mb-3 border rounded"
//               required
//             />
//             <input
//               type="text"
//               name="Experience"
//               placeholder="Experience"
//               value={experience}
//               onChange={(e) => setExperience(e.target.value)}
//               className="w-full p-2 mb-3 border rounded"
//               required
//             />
//             <input
//               type="text"
//               name="Total Publications"
//               placeholder="Total Publications"
//               value={publications}
//               onChange = {(e) => setPublications(e.target.value)}
//               className="w-full p-2 mb-3 border rounded"
//               required
//             />
            
//             <div className="flex justify-between">
//               <button onClick={handleBack} className="bg-gray-500 text-white py-2 px-4 rounded">Back</button>
//               <button onClick={handleSubmit} className="bg-green-500 text-white py-2 px-4 rounded">Submit</button>
//             </div>
//           </div>
//         )}
//         <p className="text-center mt-3 text-sm">
//           Already have an account?{" "}
//           <a href="/login" className="text-primary underline">
//             Login
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default DoctorRegistration;