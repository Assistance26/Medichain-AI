import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";

const AdminNavbar = () => {
  return (
    <div className="bg-primary text-white py-4 px-6 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">MediChainAI</h1>
      <h2 className="text-lg">Admin Dashboard</h2>
    </div>
  );
};

const MainLayout = ({ children }) => {
  const location = useLocation();

  // Define pages where the footer should be hidden
  const hiddenFooterRoutes = ["/aidoctor", "/chatbot", "/symptom-checker", "/health-score", "/cost-planning"];
  const hideFooter = hiddenFooterRoutes.includes(location.pathname);

  // Define pages where the default Navbar should be hidden
  const isAdminDashboard = location.pathname === "/AdminDashboard";

  // Remove padding only on the AiDoctor page
  const addPadding = location.pathname !== "/aidoctor";

  return (
    <div className="bg-secondary text-primary min-h-screen flex flex-col">
      {isAdminDashboard ? <AdminNavbar /> : <Navbar />}
      <main className={`flex-grow ${addPadding ? "pt-16" : ""}`}>{children}</main>
      {!hideFooter && <Footer />} {/* Hide footer on specific pages */}
    </div>
  );
};

export default MainLayout;
