import { useLocation } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar"; // Updated import
import Footer from "../components/Footer";

const AdminLayout = ({ children }) => {
  const location = useLocation();

  // Define pages where the footer should be hidden
  const hiddenFooterRoutes = ["/aidoctor", "/chatbot", "/symptom-checker", "/health-score", "/cost-planning"];
  const hideFooter = hiddenFooterRoutes.includes(location.pathname);

  return (
    <div className="bg-secondary text-primary min-h-screen flex flex-col">
      <AdminNavbar />  {/* Updated Navbar with Logout */}
      <main className="flex-grow p-6">{children}</main>
      {!hideFooter && <Footer />}
    </div>
  );
};

export default AdminLayout;
