import { Link } from "react-router-dom";
import logo from "../assets/Logo.png";
import './Header.css';

export function Header({role}){
    const isLoggedIn = Boolean(localStorage.getItem("token"));
    return(
        <div className="header">
            {/* LEFT: Logo (always visible) */}
                <div className="logo">
                    <img src={logo} alt="Logo" />
                </div>

                {/* MID: Logo ( ONLY when logged in) */}
                {isLoggedIn &&(
                    <div className="mid-header">
                    <Link to="/home">Home</Link>

                        <Link to="/browse">Browse</Link>

                        {role === "admin" ? (
                        <Link to="/add">Add</Link>
                        ) : (
                        <Link to="/bookmarks">Bookmarks</Link>
                        )}
                    </div>
                )}

                {/* RIGHT: (changes) */}
                
                <div className="right-header">
                    {isLoggedIn ? (
                        <Link to="/profile" className="profile-btn">Profile</Link>
                        ) : (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/register" className="signup-btn">Sign Up</Link>
                        </>
                        )}
                </div>
                
            </div>
    );
}