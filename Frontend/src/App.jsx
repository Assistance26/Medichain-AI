import { Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext"; // ✅ Ensuring AuthProvider wraps everything
import ChatbotProvider from "./context/ChatbotContext";  
import MainLayout from "./layouts/MainLayout";
import DoctorLayout from "./layouts/DoctorLayout"; 
import AdminLayout from "./layouts/AdminLayout"; 
import Home from "./pages/Home";
import HomePage from "./pages/HomePage";
import AdminSignup from "./pages/AdminSignup";
import AdminDashboard from "./pages/AdminDashboard";
import LoginSelection from "./pages/LoginSelection";
import About from "./pages/About";
import Services from "./pages/Services";
import Doctors from "./pages/Doctors";
import DoctorProfile from "./pages/DoctorProfile";
//import DoctorRegistration from "./pages/DoctorRegistration"; // ✅ Ensure this file exists
import Appointment from "./pages/Appointment";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
//import Signup from "./pages/Signup"; // ✅ Ensure this file exists
import HealthScore from "./pages/HealthScore";
import CostPlanning from "./pages/CostPlanning.jsx";
import SymptomChecker from "./pages/SymptomChecker.jsx";
import NotFound from "./pages/NotFound";
import Chatbot from "./components/Chatbot";
import DoctorLogin from "./pages/DoctorLogin.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import DoctorDashboard from "./pages/DoctorDashboard";
import DoctorAppointments from "./pages/DoctorAppointments";
import UnifiedSignup from './pages/UnifiedSignup.jsx';

function AppContent() {
  const { user } = useAuth();

  return (
    <ChatbotProvider>
      {user?.role === "doctor" ? (
        <DoctorLayout>
          <Routes>
            <Route path="/dashboard" element={<ProtectedRoute><DoctorDashboard /></ProtectedRoute>} /> 
            <Route path="/appointments" element={<DoctorAppointments />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </DoctorLayout>
      ) : user?.role === "admin" ? (
        <AdminLayout>
          <Routes>
            <Route path="/AdminDashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AdminLayout>
      ) : (
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/LoginSelection" element={<LoginSelection />} />
            <Route path="/unified-signup" element={<UnifiedSignup />} />
            <Route path="/about" element={<About />} />
            <Route path="/AdminSignup" element={<AdminSignup />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/DoctorLogin" element={<DoctorLogin />} />

            {/* Protected Routes */}
            <Route path="/aidoctor" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
            <Route path="/AdminDashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="/services" element={<ProtectedRoute><Services /></ProtectedRoute>} />
            <Route path="/doctors" element={<ProtectedRoute><Doctors /></ProtectedRoute>} />
            <Route path="/DoctorProfile" element={<ProtectedRoute><DoctorProfile /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><DoctorDashboard /></ProtectedRoute>} /> 
            <Route path="/appointment" element={<ProtectedRoute><Appointment /></ProtectedRoute>} />
            <Route path="/health-score" element={<ProtectedRoute><HealthScore /></ProtectedRoute>} />
            <Route path="/cost-planning" element={<ProtectedRoute><CostPlanning /></ProtectedRoute>} />
            <Route path="/symptom-checker" element={<ProtectedRoute><SymptomChecker /></ProtectedRoute>} />
            <Route path="/chatbot" element={<ProtectedRoute><Chatbot /></ProtectedRoute>} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </MainLayout>
      )}
    </ChatbotProvider>
  );
}


function App() {
  return (
    <AuthProvider>
      <AppContent /> {/* ✅ Moved useAuth inside AuthProvider */}
    </AuthProvider>
  );
}

export default App;
