import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import PublicRoute from "./routes/PublicRoutes.jsx";
import PrivateRoute from "./routes/PrivateRoutes.jsx";
import MainLayout from "./MainLayout.jsx";

const UserHome = React.lazy(() => import("./pages/private/Home.jsx"));
const UserLogin = React.lazy(() => import("./pages/public/Login.jsx"));
const UserRegister = React.lazy(() => import("./pages/public/Registration.jsx"));

export const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Wrap ALL routes in MainLayout to always show header */}
        <Route element={<MainLayout/>}>
          
          {/* Public routes */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<UserLogin />} />
            <Route path="/register" element={<UserRegister />} />
          </Route>

          {/* Private routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<UserHome />} />
            {/* add more private pages here */}
          </Route>

          {/* Redirect root / */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Global fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
