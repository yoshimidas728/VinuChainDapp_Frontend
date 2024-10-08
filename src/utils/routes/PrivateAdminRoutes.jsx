import React from "react";
import { Navigate } from "react-router";

const PrivateAdminRoutes = ({ children }) => {
  const localToken = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!localToken) {
    return <Navigate to={"/login"} replace />;
  }
  if (userRole && userRole === "admin") {
    return children;
  } else {
    return <Navigate to={"/"} replace />;
  }
};

export default PrivateAdminRoutes;
