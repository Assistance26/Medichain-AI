import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-lg font-bold">MediChain AI</h1>
      <div className="space-x-6">
        <Link to="/" className="hover:text-gray-300 transition">Home</Link>
        <Link to="/about" className="hover:text-gray-300 transition">About Us</Link>
        <Link to="/services" className="hover:text-gray-300 transition">Services</Link> 
      </div>
    </nav>
  );
}

export default Navbar;
