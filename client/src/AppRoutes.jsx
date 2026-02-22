import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import PublicRoute from "./routes/PublicRoutes.jsx";
import PrivateRoute from "./routes/PrivateRoutes.jsx";
import MainLayout from "./MainLayout.jsx";

const UserHome = React.lazy(() => import("./pages/private/Home.jsx"));
const UserBrowse = React.lazy(() => import("./pages/private/Browse.jsx"));
const PropertyDetail = React.lazy(() => import("./pages/private/Details.jsx"));
const UserProfile = React.lazy(() => import("./pages/private/Profile.jsx"));
const UserRequest = React.lazy(() => import("./pages/private/Request.jsx"));

const AdminAdd = React.lazy(() => import("./pages/private/Add.jsx"));
const AdminHome = React.lazy(() => import("./pages/private/Admin.jsx"));

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
            <Route path="/user" element={<UserHome />} />
            <Route path="/browse" element={<UserBrowse />} />
            <Route path="/property/:id" element={<PropertyDetail />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/requests" element={<UserRequest />} />

            <Route path="/add" element={<AdminAdd />} />
            <Route path="/home" element={<AdminHome />} />
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
