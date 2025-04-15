// src/components/PrivateRoute.jsx
import { Navigate } from "react-router";
import { useAuth } from "../contexts/AuthContexts";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>; // or a spinner

  return user ? children : <Navigate to="/" />; // Redirect to login page if no user
};

export default PrivateRoute;
