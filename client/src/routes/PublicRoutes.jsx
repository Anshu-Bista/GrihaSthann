import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const PublicRoutes = () => {
  const token = localStorage.getItem("access_token");
  return token ? <Navigate to ="/product" replace /> :<Outlet/>
};

export default PublicRoutes;
