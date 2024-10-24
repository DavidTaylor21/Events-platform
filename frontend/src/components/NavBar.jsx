import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GoogleLoginButton } from "./GoogleLoginButton";
import { UserContext } from "./UserContext";

export const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { loggedInUser } = useContext(UserContext);

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
            All Events
          </Link>
        </li>
        <li>
          <Link to="/my-events" className="nav-link">
            My Events
          </Link>
        </li>
        {loggedInUser && loggedInUser.staff && (
          <>
            <li>
              <Link to="/manage-events" className="nav-link">
                Manage Events
              </Link>
            </li>
            <li>
              <Link to="/add-event" className="nav-link">
                Add Event
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
