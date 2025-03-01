import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SymptomChecker from "./components/SymptomChecker";
import AboutUs from "./components/AboutUs";
import Services from "./pages/Services";

function App() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<SymptomChecker />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
