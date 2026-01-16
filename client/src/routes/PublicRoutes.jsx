import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicRoutes = () => {
  const { token } = useAuth(); 
  return token ? <Navigate to="/home" replace /> : <Outlet />;
};

export default PublicRoutes;
