import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const LandingPage = React.lazy(() => import("./pages/public/Landingpage.jsx"));
const Login = React.lazy(() => import("./pages/public/Login.jsx"));
const Register = React.lazy(() => import("./pages/public/Register.jsx"));

const PublicRoutes = ({ setToken, setRole }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login setToken={setToken} setRole={setRole} />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default PublicRoutes;
