import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SymptomChecker from "./components/SymptomChecker";
import AboutUs from "./components/AboutUs";
import Services from "./pages/Services";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ServiceCategory from "./components/ServiceCategory";
import PopularDoctors from "./components/PopularDoctors";

function App() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<SymptomChecker />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>
      
      <ServiceCategory />
      <PopularDoctors />
      <Footer />
    </>
  );
}

export default App;
