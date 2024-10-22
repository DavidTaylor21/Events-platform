import { Routes, Route, Navigate } from "react-router-dom";
import { EventsList } from "./components/EventsList";
import { SingleEvent } from "./components/SingleEvent";
import { LoginPage } from "./components/LoginPage";
import { UserContext } from "./components/UserContext";
import { NavBar } from "./components/NavBar";
import { GoogleLoginButton } from "./components/GoogleLoginButton";
import { useContext, useState, useEffect } from "react";
import "./App.css"

function App() {
  const { logout, setLoggedInUser } = useContext(UserContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isStaff, setIsStaff] = useState(false);
  useEffect(() => {
    const userData = localStorage.getItem("eventsPlatformUser");
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      setIsLoggedIn(true);
      setIsStaff(parsedUserData.staff);
      setLoggedInUser(parsedUserData);
    } else {
      setIsLoggedIn(false);
    }
  }, [setLoggedInUser]);
  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    setIsStaff(false);
    localStorage.removeItem("eventsPlatformUser");
  };
  const ProtectedRoute = ({ element }) => {
    return isLoggedIn ? element : <Navigate to="/login" />;
  };

  return (
    <>
      <h1>EVENTS PLATFORM</h1>
      {isLoggedIn && (
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      )}
      <NavBar isStaff={isStaff} />
      <Routes>
        <Route
          path="/events"
          element={<ProtectedRoute element={<EventsList />} />}
        />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route
          path="/events/:event_id"
          element={<ProtectedRoute element={<SingleEvent />} />}
        />

        <Route
          path="/login"
          element={
            <LoginPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          }
        />
      </Routes>
    </>
  );
}

export default App;
