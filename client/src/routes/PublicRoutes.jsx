import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicRoutes = () => {
  const { token, user } = useAuth();

  if (!token) return <Outlet />;

  return user?.role === "admin"
    ? <Navigate to="/admin/home" replace />
    : <Navigate to="/user/home" replace />;
};

export default PublicRoutes;