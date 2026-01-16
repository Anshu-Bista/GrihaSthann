// src/layouts/MainLayout.jsx
import { Outlet } from "react-router-dom";
import { Header } from "./components/Header.jsx";

export default function MainLayout() {
  return (
    <>
       <Header />   {/* Always visible */}
       <Outlet />   {/* Public or private pages render here */}
    </>
  );
}
