// import React from 'react';
// import { Routes, Route } from "react-router-dom";
// import MainLayout from "./layouts/MainLayout";
// import Home from "./pages/Home";
// import LoginSelection from './pages/LoginSelection';
// import About from "./pages/About";
// import Services from "./pages/Services";
// import Doctors from "./pages/Doctors";
// import DoctorProfile from "./pages/DoctorProfile";
// import DoctorRegistration from "./pages/DoctorRegistration";
// import Appointment from "./pages/Appointment";
// import Contact from "./pages/Contact";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import AiDoctor from "./pages/AiDoctor";
// import HealthScore from "./pages/HealthScore";
// import CostPlanning from "./pages/CostPlanning";
// import SymptomChecker from "./pages/SymptomChecker";
// import NotFound from "./pages/NotFound";
// import Chatbot from "./components/Chatbot";
// import { ChatbotProvider } from "./context/ChatbotContext";

// function App() {
//   return (
//     <ChatbotProvider>
//       <MainLayout>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/LoginSelection" element={<LoginSelection />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/services" element={<Services />} />
//           <Route path="/doctors" element={<Doctors />} />
//           <Route path="/DoctorProfile" element={<DoctorProfile />} />
//           <Route path="/DoctorRegistration" element={<DoctorRegistration />} />
//           <Route path="/appointment" element={<Appointment />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/aidoctor" element={<AiDoctor />} />
//           <Route path="/health-score" element={<HealthScore />} />
//           <Route path="/cost-planning" element={<CostPlanning />} />
//           <Route path="/symptom-checker" element={<SymptomChecker />} />
//           <Route path="/chatbot" element={<Chatbot />} />
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </MainLayout>
//     </ChatbotProvider>
//   );
// }

// export default App;


import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import HomePage from "./pages/HomePage";
import LoginSelection from './pages/LoginSelection';
import About from "./pages/About";
import Services from "./pages/Services";
import Doctors from "./pages/Doctors";
import DoctorProfile from "./pages/DoctorProfile";
import DoctorRegistration from "./pages/DoctorRegistration";
import Appointment from "./pages/Appointment";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AiDoctor from "./pages/AiDoctor";
import HealthScore from "./pages/HealthScore";
import CostPlanning from "./pages/CostPlanning.jsx";
import SymptomChecker from "./pages/SymptomChecker.jsx";
import NotFound from "./pages/NotFound";
import Chatbot from "./components/Chatbot";
import { ChatbotProvider } from "./context/ChatbotContext";

function App() {
  return (
    <ChatbotProvider>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/LoginSelection" element={<LoginSelection />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/DoctorProfile" element={<DoctorProfile />} />
          <Route path="/DoctorRegistration" element={<DoctorRegistration />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/aidoctor" element={<AiDoctor />} />
          <Route path="/health-score" element={<HealthScore />} />
          <Route path="/cost-planning" element={<CostPlanning />} />
          <Route path="/symptom-checker" element={<SymptomChecker />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainLayout>
    </ChatbotProvider>
  );
}

export default App;
