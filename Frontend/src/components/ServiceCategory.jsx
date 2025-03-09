import { FaUserMd, FaUserNurse, FaPills, FaHandHoldingMedical } from "react-icons/fa";

const ServiceCategory = () => {
  const categories = [
    { name: "Doctor", icon: <FaUserMd className="text-3xl text-blue-600" /> },
    { name: "Nurse", icon: <FaUserNurse className="text-3xl text-green-600" /> },
    { name: "Drug", icon: <FaPills className="text-3xl text-red-600" /> },
    { name: "Caregiver", icon: <FaHandHoldingMedical className="text-3xl text-purple-600" /> },
  ];

  return (
    <div className="p-4 bg-gradient-to-r from-green-400 to-blue-400">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Service Category</h2>
        <a href="#" className="text-blue-500">See All</a>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {categories.map((category, index) => (
          <div key={index} className="flex flex-col items-center bg-gray-100 p-3 rounded-xl shadow">
            {category.icon}
            <p className="text-sm mt-2">{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceCategory;
