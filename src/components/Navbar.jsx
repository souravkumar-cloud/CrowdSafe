import React from "react";
import "../styles/Navbar.css";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="navbar-logo">🔍</span>
        <h1>Community Safety Map</h1>
      </div>
      <div className="navbar-links">
        <a href="#" className="navbar-link">
          About
        </a>
        <a href="#" className="navbar-link">
          Help
        </a>
        {isLoggedIn ? (
          <>
            <span className="user-greeting">Welcome, User!</span>
            <button
              className="auth-button logout"
              onClick={() => setIsLoggedIn(false)}
            >
              Log Out
            </button>
          </>
        ) : (
          <button
            className="auth-button login"
            onClick={() => setIsLoggedIn(true)}
          >
            Log In
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
