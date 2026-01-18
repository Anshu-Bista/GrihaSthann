import { Link } from "react-router-dom";
import logo from "../assets/Logo.png";
import { useAuth } from "../context/AuthContext";

export function Header({ role }) {
  const { token } = useAuth();
  const isLoggedIn = Boolean(token);

  const logoLink = isLoggedIn ? "/home" : "/";

  return (
    <header className="h-16 px-8 flex items-center justify-between bg-soft-olive border-b border-black/10 relative">
      
      {/* LEFT: Logo */}
      <Link to={logoLink} className="flex items-center">
        <img
          src={logo}
          alt="Logo"
          className="h-12 md:h-14 w-auto transition-transform hover:scale-105"
        />
      </Link>

      {/* MID: Navigation (only when logged in) */}
      {isLoggedIn && (
        <nav className="absolute left-1/2 -translate-x-1/2 flex gap-8">
          <HeaderLink to="/home">Home</HeaderLink>
          <HeaderLink to="/browse">Browse</HeaderLink>

          {role === "admin" ? (
            <HeaderLink to="/add">Add</HeaderLink>
          ) : (
            <HeaderLink to="/bookmarks">Bookmarks</HeaderLink>
          )}
        </nav>
      )}

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <Link
            to="/profile"
            className="bg-mint-green text-forest-green px-4 py-2 rounded-full font-medium hover:bg-mint-green/80 transition"
          >
            Profile
          </Link>
        ) : (
          <>
            <HeaderLink to="/login">Login</HeaderLink>
            <Link
              to="/register"
              className="bg-forest-green text-white px-5 py-2 rounded-full font-medium shadow-md hover:bg-bright-green hover:-translate-y-0.5 hover:shadow-lg transition"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

function HeaderLink({ to, children }) {
  return (
    <Link
      to={to}
      className="relative font-medium text-off-white transition-colors hover:text-forest-green
                 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0
                 after:bg-forest-green after:transition-all hover:after:w-full"
    >
      {children}
    </Link>
  );
}
