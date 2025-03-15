import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const DoctorProfile = () => {
  const location = useLocation();
  const doctor = location.state || {};

  return (
    <div className="container mx-auto p-6 flex justify-center">
      <motion.div
        className="max-w-4xl w-full bg-white shadow-xl rounded-2xl p-8 border border-gray-200 flex flex-col items-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Profile Picture */}
        <div className="w-40 h-40 bg-gray-300 rounded-full overflow-hidden shadow-md mb-6">
          <img
            src={`https://i.pravatar.cc/150?u=${doctor.name}`}
            alt={doctor.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Doctor Details */}
        <h2 className="text-4xl font-bold text-blue-600">{doctor.name}</h2>
        <p className="text-xl text-gray-500 mb-6">{doctor.specialization}</p>

        {/* Info Table Layout */}
        <div className="w-full">
          {[
            { label: "📧 Email", value: doctor.email },
            { label: "📞 Phone", value: doctor.number },
            { label: "🔢 License Number", value: doctor.licenseNumber },
            { label: "🏆 Experience", value: `${doctor.Experience} years` },
            { label: "📚 Publications", value: doctor.publications },
          ].map((item, index) => (
            <div
              key={index}
              className="flex justify-between border-b border-gray-300 py-3 text-lg"
            >
              <span className="font-semibold text-gray-700">{item.label}:</span>
              <span className="text-gray-900">{item.value}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default DoctorProfile;
