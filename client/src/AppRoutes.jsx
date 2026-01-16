import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import PublicRoute from "./routes/PublicRoutes.jsx";
import PrivateRoute from "./routes/PrivateRoutes.jsx";

const UserHome = React.lazy(() => import("./pages/private/Home.jsx"));
const UserLogin = React.lazy(() => import("./pages/public/Login.jsx"));
const UserRegister = React.lazy(() => import("./pages/public/Registration.jsx"));

export const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* redirect root "/" to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* PUBLIC ROUTES */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<UserLogin />} />
          <Route path="/register" element={<UserRegister />} />
        </Route>

        {/* PRIVATE ROUTES */}
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<UserHome />} />
        </Route>

        {/* GLOBAL 404 fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  );
};
