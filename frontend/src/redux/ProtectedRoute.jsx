// components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user); // Get user from Redux store

  // If no user is logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children; // If user is authenticated, render the protected route
};

export default ProtectedRoute;
