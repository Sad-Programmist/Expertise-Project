import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children}) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  if (isAuthenticated !== process.env.REACT_APP_IS_AUTH) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default ProtectedRoute;