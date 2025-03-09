import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const doctors = [
  { name: "Dr. John Doe", specialty: "Cardiologist" },
  { name: "Dr. Jane Smith", specialty: "Dermatologist" },
  { name: "Dr. Alice Johnson", specialty: "Neurologist" },
  { name: "Dr. Mark Lee", specialty: "Orthopedic" },
];

const Doctors = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const navigate = useNavigate();

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedSpecialty === "" || doctor.specialty === selectedSpecialty)
  );

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
        👨‍⚕️ Meet Our <span className="text-blue-500">Specialists</span>
      </h2>

      {/* 🔍 Search and Filter Section */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
        <input
          type="text"
          placeholder="🔍 Search doctors..."
          className="p-3 border border-gray-300 shadow-md rounded-lg w-full md:w-1/3 focus:ring-2 focus:ring-blue-400 outline-none transition-all"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <select
          className="p-3 border border-gray-300 shadow-md rounded-lg w-full md:w-1/3 focus:ring-2 focus:ring-blue-400 outline-none transition-all"
          value={selectedSpecialty}
          onChange={(e) => setSelectedSpecialty(e.target.value)}
        >
          <option value="">📌 All Specialties</option>
          {[...new Set(doctors.map((doc) => doc.specialty))].map((specialty) => (
            <option key={specialty} value={specialty}>
              {specialty}
            </option>
          ))}
        </select>
      </div>

      {/* 🏥 Doctor List */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor, index) => {
            const encodedName = encodeURIComponent(doctor.name);
            return (
              <motion.div
                key={index}
                className="p-6 bg-white shadow-lg rounded-2xl text-center cursor-pointer backdrop-blur-md bg-opacity-80 transition-all hover:shadow-2xl border border-gray-200"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                onClick={() => navigate(`/doctors/${encodedName}`)}
              >
                {/* Profile Picture */}
                <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4 overflow-hidden">
                  <img 
                    src={`https://i.pravatar.cc/100?img=${index + 10}`} 
                    alt={doctor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Doctor Details */}
                <h3 className="mt-2 text-2xl font-semibold text-blue-600 hover:underline">
                  {doctor.name}
                </h3>
                <p className="text-gray-500">{doctor.specialty}</p>
              </motion.div>
            );
          })
        ) : (
          <p className="text-center text-gray-500 col-span-3">
            🚫 No doctors found.
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default Doctors;
