import { Navigate, useLocation } from 'react-router-dom';
import {useContext} from 'react';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  if (!user) {
    // Redirect to login with return path
    return <Navigate to="/LoginSelection" state={{ from: location.pathname }} />;
  }

  // Uncomment to restrict based on allowed roles (if needed)
  // if (allowedRoles && !allowedRoles.includes(user.role)) {
  //   // Redirect unauthorized users to home
  //   return <Navigate to="/" />;
  // }

  return children;
};

export default ProtectedRoute;
