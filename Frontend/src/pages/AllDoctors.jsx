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

const AllDoctors = () => {
  return (
    <div className="p-4 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">All Available Doctors</h2>
        <Link to="/" className="text-blue-500 hover:underline">Go Back</Link>
      </div>

      <div className="space-y-4">
        {doctors.map((doctor, index) => (
          <div key={index} className="flex items-center bg-white p-4 rounded-xl shadow-md">
            <img src={doctor.image} alt={doctor.name} className="w-16 h-16 rounded-full object-cover mr-4" />
            <div className="flex-1">
              <p className="font-semibold text-lg">{doctor.name}</p>
              <p className="text-sm text-gray-500">{doctor.specialty}</p>
            </div>
            <div className="flex items-center text-yellow-500 text-sm">
              <FaStar /> <span className="ml-1 font-semibold">{doctor.rating}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllDoctors;
