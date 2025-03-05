import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="bg-secondary text-primary">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};
export default MainLayout;