import { useNavigate } from "react-router-dom";

const LoginSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          className="bg-white p-6 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition transform hover:scale-105"
          onClick={() => navigate("/DoctorRegistration")}
        >
          <h2 className="text-2xl font-semibold text-center mb-4">Sign in as Doctor</h2>
          <p className="text-center text-gray-600">Access your medical dashboard</p>
        </div>

        <div
          className="bg-white p-6 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition transform hover:scale-105"
          onClick={() => navigate("/login")}
        >
          <h2 className="text-2xl font-semibold text-center mb-4">Sign in as Patient</h2>
          <p className="text-center text-gray-600">Manage your health records</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSelection;
