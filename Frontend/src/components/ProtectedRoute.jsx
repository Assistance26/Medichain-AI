import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useUser();
  const location = useLocation();

  if (!user) {
    // Redirect to login with return path
    return <Navigate to="/LoginSelection" state={{ from: location.pathname }} />;
  }

//   if (allowedRoles && !allowedRoles.includes(user.role)) {
//     // Redirect unauthorized users to home
//     return <Navigate to="/" />;
//   }2

  return children;
};

export default ProtectedRoute;