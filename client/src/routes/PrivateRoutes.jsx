import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const UserHome = React.lazy(() => import("../pages/private/Home.jsx"));
const PrivateRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>

        <Route path="/home" element={<UserHome />} />
      </Routes>
    </Suspense>
  );
};

export default PrivateRoutes;
