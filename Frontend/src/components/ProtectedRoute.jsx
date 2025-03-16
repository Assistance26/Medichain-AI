import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { authUser } = useAuth();
  const location = useLocation();

  if (!authUser) {
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