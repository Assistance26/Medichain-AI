import { motion } from "framer-motion";

const doctors = [
  { name: "Dr. John Doe", specialty: "Cardiologist" },
  { name: "Dr. Jane Smith", specialty: "Dermatologist" },
];

const Doctors = () => {
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center">Meet Our Doctors</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {doctors.map((doctor, index) => (
          <motion.div
            key={index}
            className="p-4 bg-white shadow-md rounded-lg text-center"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto"></div>
            <h3 className="mt-2 text-xl font-semibold">{doctor.name}</h3>
            <p className="text-gray-600">{doctor.specialty}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Doctors;
