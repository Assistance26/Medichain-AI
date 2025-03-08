import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import AboutUs from "./components/AboutUs";
import Services from "./pages/Services";
import VideoCall from "./components/VideoCall";

function App() {
  return (
    <>
      <main className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/video-call" element={<VideoCall />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
