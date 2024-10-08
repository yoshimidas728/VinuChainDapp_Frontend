import React from "react";
import { Navigate } from "react-router";

const PrivateUserRoutes = ({ children }) => {
  const localToken = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");
  console.log(
    "🚀 ~ file: PrivateUserRoutes.jsx:7 ~ PrivateUserRoutes ~ userRole:",
    typeof userRole
  );

  if (!localToken) {
    return <Navigate to={"/login"} replace />;
  }
  if (userRole && (userRole === "user" || userRole === "Author" || userRole === "AuthorShipPending" )) {
    return children;
  } else {
    return <Navigate to={"/"} replace />;
  }
};

export default PrivateUserRoutes;
