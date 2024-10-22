import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GoogleLoginButton } from "./GoogleLoginButton";

export const NavBar = ({ isStaff }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === "/";

  return (
    <nav className="navbar">
      {!isHomePage && (
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back
        </button>
      )}

      <ul className="nav-links">
        <li>
          <Link to="/events" className="nav-link">
            Events
          </Link>
        </li>
        <li>
          <Link to="/calendar" className="nav-link">
            Calendar
          </Link>
        </li>
        {isStaff && (
          <li>
            <Link to="/manage-events" className="nav-link">
              Manage Events
            </Link>
          </li>
        )}
      </ul>
      <GoogleLoginButton />
    </nav>
  );
};
