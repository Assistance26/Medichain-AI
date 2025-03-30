import { Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import ChatbotProvider from "./context/ChatbotContext";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout"; // Check if imported correctly
import DoctorLayout from "./layouts/DoctorLayout"; // Check if imported correctly
import Home from "./pages/Home";
import HomePage from "./pages/HomePage";
import AdminSignup from "./pages/AdminSignup";
import AdminDashboard from "./pages/AdminDashboard";
import LoginSelection from "./pages/LoginSelection";
import About from "./pages/About";
import Services from "./pages/Services";
import Doctors from "./pages/Doctors";
import DoctorProfile from "./pages/DoctorProfile";
//import DoctorRegistration from "./pages/DoctorRegistration";
import Appointment from "./pages/Appointment";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import UnifiedSignup from "./pages/UnifiedSignup";
import DoctorLogin from "./pages/DoctorLogin";
import HealthScore from "./pages/HealthScore";
import CostPlanning from "./pages/CostPlanning";
import SymptomChecker from "./pages/SymptomChecker";
import NotFound from "./pages/NotFound";
import Chatbot from "./components/Chatbot";
import ProtectedRoute from "./components/ProtectedRoute";
import DoctorDashboard from "./pages/DoctorDashboard";
import DoctorAppointments from "./pages/DoctorAppointments";

function App() {
  const { user } = useAuth();

  return (
    <ChatbotProvider>
      {user?.role === "doctor" ? (
        <DoctorLayout>
          <Routes>
            <Route path="/dashboard" element={<DoctorDashboard />} />
            <Route path="/appointments" element={<DoctorAppointments />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </DoctorLayout>
      ) : user?.role === "admin" ? (
        <AdminLayout>
          <Routes>
            <Route path="/AdminDashboard" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AdminLayout>
      ) : (
        <MainLayout>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/LoginSelection" element={<LoginSelection />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/unified-signup" element={<UnifiedSignup />} />
            <Route path="/DoctorLogin" element={<DoctorLogin />} />
            {/* <Route path="/DoctorRegistration" element={<DoctorRegistration />} /> */}
            <Route path="/AdminSignup" element={<AdminSignup />} />
            
            {/* Protected Routes */}
            <Route
              path="/aidoctor"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/AdminDashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/services"
              element={
                <ProtectedRoute>
                  <Services />
                </ProtectedRoute>
              }
            />
            <Route
              path="/doctors"
              element={
                <ProtectedRoute>
                  <Doctors />
                </ProtectedRoute>
              }
            />
            <Route
              path="/DoctorProfile"
              element={
                <ProtectedRoute>
                  <DoctorProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/DoctorDashboard"
              element={
                <ProtectedRoute>
                  <DoctorDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/appointment"
              element={
                <ProtectedRoute>
                  <Appointment />
                </ProtectedRoute>
              }
            />
            <Route
              path="/health-score"
              element={
                <ProtectedRoute>
                  <HealthScore />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cost-planning"
              element={
                <ProtectedRoute>
                  <CostPlanning />
                </ProtectedRoute>
              }
            />
            <Route
              path="/symptom-checker"
              element={
                <ProtectedRoute>
                  <SymptomChecker />
                </ProtectedRoute>
              }
            />
            <Route
              path="/chatbot"
              element={
                <ProtectedRoute>
                  <Chatbot />
                </ProtectedRoute>
              }
            />
            
            {/* 404 Page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </MainLayout>
      )}
    </ChatbotProvider>
  );
}

export default App;
