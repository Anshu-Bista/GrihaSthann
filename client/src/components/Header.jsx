import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export function Header() {

  const { token, user } = useAuth();
  const isLoggedIn = Boolean(token);
  const role = user?.role;

  const [mobileOpen, setMobileOpen] = useState(false);

  // ⭐ Role based home link
  const homeLink = role === "admin"
    ? "/admin/home"
    : "/user/home";

  return (
    <header className="h-16 px-6 flex items-center justify-between bg-soft-olive border-b border-black/10 relative">

      {/* LEFT - Logo */}
      <Link to={homeLink} className="flex items-center">
        <img
          src={logo}
          alt="Logo"
          className="h-10 md:h-12 w-auto transition-transform hover:scale-105"
        />
      </Link>

      {/* ⭐ Desktop Navigation */}
      {isLoggedIn && (
        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 gap-8">
          <HeaderLink to={homeLink}>Home</HeaderLink>
          <HeaderLink to="/browse">Browse</HeaderLink>

          {role === "admin" ? (
            <HeaderLink to="/add">Add</HeaderLink>
          ) : (
            <HeaderLink to="/requests">Requests</HeaderLink>
          )}
        </nav>
      )}

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-4">

        {isLoggedIn ? (
          <Link
            to="/profile"
            className="bg-mint-green text-forest-green px-4 py-2 rounded-full font-medium hidden md:block"
          >
            Profile
          </Link>
        ) : (
          <>
            <HeaderLink to="/login">Login</HeaderLink>

            <Link
              to="/register"
              className="bg-forest-green text-white px-5 py-2 rounded-full font-medium hidden md:block"
            >
              Sign Up
            </Link>
          </>
        )}

        {/* ⭐ Mobile Menu Button */}
        {isLoggedIn && (
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            ☰
          </button>
        )}
      </div>

      {/* ⭐ Mobile Menu Drawer */}
      {mobileOpen && isLoggedIn && (
        <div className="absolute top-16 left-0 w-full bg-soft-olive shadow-lg md:hidden z-50">

          <div className="flex flex-col p-6 gap-4">

            <HeaderLink to={homeLink}>Home</HeaderLink>
            <HeaderLink to="/browse">Browse</HeaderLink>

            {role === "admin" ? (
              <HeaderLink to="/add">Add Property</HeaderLink>
            ) : (
              <HeaderLink to="/requests">Requests</HeaderLink>
            )}

            <HeaderLink to="/profile">Profile</HeaderLink>

          </div>

        </div>
      )}

    </header>
  );
}

/* ⭐ Reusable Link Component */
function HeaderLink({ to, children }) {
  return (
    <Link
      to={to}
      className="relative font-medium text-off-white hover:text-forest-green transition
      after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0
      after:bg-forest-green after:transition-all hover:after:w-full"
    >
      {children}
    </Link>
  );
}