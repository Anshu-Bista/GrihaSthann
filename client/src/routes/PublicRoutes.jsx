import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const UserLogin = React.lazy(() => import("../pages/public/Login.jsx"));
const UserRegister = React.lazy(() => import("../pages/public/Registration.jsx"));

const PublicRoutes = ({ setToken, setRole }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route
          path="/login"
          element={<UserLogin setToken={setToken} setRole={setRole} />}
        />
        <Route
          path="/register"
          element={<UserRegister setToken={setToken} setRole={setRole} />}
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  );
};

export default PublicRoutes;
