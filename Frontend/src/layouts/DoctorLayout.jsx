import DoctorNavbar from "../components/DoctorNavbar";

const DoctorLayout = ({ children }) => {
  return (
    <div className="doctor-layout">
      <DoctorNavbar />
      <main>{children}</main>
    </div>
  );
};

export default DoctorLayout;
