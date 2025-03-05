import { AiOutlineRobot } from "react-icons/ai";
import { MdHealthAndSafety, MdOutlineMedicalServices } from "react-icons/md";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const services = [
  { name: "AI Doctor", icon: <AiOutlineRobot className="text-5xl text-white" /> },
  { name: "Symptoms Checker", icon: <MdOutlineMedicalServices className="text-5xl text-white" /> },
  { name: "Health Score", icon: <MdHealthAndSafety className="text-5xl text-white" /> },
  { name: "AI Cost Planning", icon: <FaMoneyCheckAlt className="text-5xl text-white" /> },
];

const Services = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content */}
      <div className="flex-grow px-6 py-4"> {/* Reduced padding */}
        <h3 className="text-2xl font-bold text-center text-primary">Our Services</h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3"> {/* Reduced margin */}
          {services.map((service, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-primary text-white p-5 rounded-2xl shadow-lg flex flex-col items-center justify-center transition-all duration-300 hover:shadow-xl"
            >
              {service.icon}
              <p className="mt-1 font-medium text-lg">{service.name}</p> {/* Reduced margin */}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
