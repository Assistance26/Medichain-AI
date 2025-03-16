import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";

const MainLayout = ({ children }) => {
  const location = useLocation();

  // Define pages where the footer should be hidden
  const hiddenFooterRoutes = ["/aidoctor","/chatbot", "/symptom-checker", "/health-score", "/cost-planning"];
  const hideFooter = hiddenFooterRoutes.includes(location.pathname);

  // Remove padding only on the AiDoctor page
  const addPadding = location.pathname !== "/aidoctor";

  return (
    <div className="bg-secondary text-primary min-h-screen flex flex-col">
      <Navbar />
      <main className={`flex-grow ${addPadding ? "pt-16" : ""}`}>{children}</main>
      {!hideFooter && <Footer />} {/* Hide footer on specific pages */}
    </div>
  );
};

export default MainLayout;
