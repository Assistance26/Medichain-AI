import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Doctors from "./pages/Doctors";
import DoctorProfile from "./pages/DoctorProfile"; // Import this
import Appointment from "./pages/Appointment";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AiDoctor from "./pages/AiDoctor";
import HealthScore from "./pages/HealthScore";
import CostPlanning from "./pages/CostPlanning.jsx";
import SymptomChecker from "./pages/SymptomChecker.jsx";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:doctorName" element={<DoctorProfile />} />{" "}
        {/* ✅ Fix: Dynamic Route */}
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/aidoctor" element={<AiDoctor />} />
        <Route path="/health-score" element={<HealthScore />} />
        <Route path="/cost-planning" element={<CostPlanning />} />
        <Route path="/symptom-checker" element={<SymptomChecker />} />
        <Route path="*" element={<NotFound />} /> {/* 404 Page Route */}
      </Routes>
    </MainLayout>
  );
}

export default App;
