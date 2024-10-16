import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ element }) => {
  const { user } = useAuth(); 

  if (!user || user.role !== "staff") {
    return <Navigate to="/login" replace />;
  }

  return element; 
};

export default ProtectedRoute;