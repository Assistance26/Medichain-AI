import { motion } from "framer-motion";

const doctors = [
  { name: "Dr. Olivia Carter", specialty: "Cardiologist", rating: 5 },
  { name: "Dr. James Smith", specialty: "Neurologist", rating: 4 },
  { name: "Dr. Emily Johnson", specialty: "Dermatologist", rating: 4.5 },
  { name: "Dr. Daniel Brown", specialty: "Orthopedic Surgeon", rating: 5 },
];

const PopularDoctor = () => {
  return (
    <div className="mt-10">
      <h3 className="text-xl font-semibold text-center">Popular Doctors</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {doctors.map((doctor, index) => (
          <motion.div key={index} whileHover={{ scale: 1.05 }} className="bg-white p-4 rounded-lg shadow-md text-center">
            <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto"></div>
            <p className="mt-2 font-semibold text-primary">{doctor.name}</p>
            <p className="text-gray-600">{doctor.specialty}</p>
            <p className="text-yellow-500">
              {"★".repeat(Math.floor(doctor.rating))}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Export the doctor list
export { doctors };

export default PopularDoctor;
