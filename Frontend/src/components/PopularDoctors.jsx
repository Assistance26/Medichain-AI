import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const doctors = [
    { name: "John Wilson", specialty: "Cardiology", rating: 4.8, image: "/assets/doctor1.jpg" },
    { name: "Alexa Johnson", specialty: "Heart Surgeon", rating: 4.5, image: "/assets/doctor2.jpg" },
    { name: "Tim Smith", specialty: "Microbiologist", rating: 4.5, image: "/assets/doctor3.jpg" },
    { name: "Emily Brown", specialty: "Neurologist", rating: 4.7, image: "/assets/doctor4.jpg" },
    { name: "Michael Lee", specialty: "Orthopedic Surgeon", rating: 4.6, image: "/assets/doctor5.jpg" },
    { name: "Sophia Davis", specialty: "Dermatologist", rating: 4.9, image: "/assets/doctor6.jpg" },
    { name: "David Martinez", specialty: "Pediatrician", rating: 4.7, image: "/assets/doctor7.jpg" },
    { name: "Olivia Thompson", specialty: "Psychiatrist", rating: 4.8, image: "/assets/doctor8.jpg" },
    { name: "James Anderson", specialty: "General Physician", rating: 4.6, image: "/assets/doctor9.jpg" },
    { name: "Emma Garcia", specialty: "Oncologist", rating: 4.9, image: "/assets/doctor10.jpg" },
  ];

const PopularDoctors = () => {
  return (
    <div className="p-4 bg-gradient-to-r from-green-400 to-blue-400">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Popular Doctors</h2>
        <Link to="/all-doctors" className="text-blue-500">See All</Link>
      </div>

      {/* Scrollable Section */}
      <motion.div
        className="flex gap-4 overflow-x-auto p-2 scrollbar-hide"
        whileTap={{ cursor: "grabbing" }}
      >
        {doctors.map((doctor, index) => (
          <motion.div
            key={index}
            className="min-w-[180px] bg-white p-3 rounded-xl shadow-md"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-full h-24 object-cover rounded-md"
            />
            <p className="font-semibold mt-2">{doctor.name}</p>
            <p className="text-sm text-gray-500">{doctor.specialty}</p>
            <div className="flex items-center text-yellow-500 text-sm">
              <FaStar /> <span className="ml-1">{doctor.rating}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default PopularDoctors;
