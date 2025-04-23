import React from "react";
import { Navigate } from "react-router-dom";
import { ACCESS_TOKEN } from "../utils/constants";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // Check if access token exists in local storage
  const isAuthenticated = !!localStorage.getItem(ACCESS_TOKEN);

  if (!isAuthenticated) {
    // Redirect to signin page if not authenticated
    return <Navigate to="/" replace />;
  }

  // Render children if authenticated
  return <>{children}</>;
};

export default ProtectedRoute;