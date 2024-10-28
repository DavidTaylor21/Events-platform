import { Routes, Route, Navigate } from "react-router-dom";
import { EventsList } from "./components/EventsList";
import { SingleEvent } from "./components/SingleEvent";
import { LoginPage } from "./components/LoginPage";
import { UserContext } from "./components/UserContext";
import { NavBar } from "./components/NavBar";
import { useContext, useState, useEffect } from "react";
import { MyEvents } from "./components/MyEvents";
import { AddEvent } from "./components/AddEvent";

import "./App.css";
import { ManageEvents } from "./components/ManageEvents";
import { GoogleLoginButton } from "./components/GoogleLoginButton";

function App() {
  const { logout, setLoggedInUser, loggedInUser } = useContext(UserContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const userData = localStorage.getItem("eventsPlatformUser");
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      setIsLoggedIn(true);
      setLoggedInUser(parsedUserData);
    } else {
      setIsLoggedIn(false);
    }
  }, [setLoggedInUser]);
  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    localStorage.removeItem("googleAccessToken");
  };
  const ProtectedRoute = ({ element }) => {
    return isLoggedIn ? element : <Navigate to="/login" />;
  };
  return (
    <>
      <h1>EVENTS PLATFORM</h1>

      {isLoggedIn && (
        <>
          <GoogleLoginButton />
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
          <p>Logged in as {loggedInUser.name}</p>

          <NavBar />
        </>
      )}
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
        <Route
          path="/my-events"
          element={<ProtectedRoute element={<MyEvents />} />}
        />
        <Route
          path="/manage-events"
          element={<ProtectedRoute element={<ManageEvents />} />}
        />
        <Route
          path="/add-event"
          element={<ProtectedRoute element={<AddEvent />} />}
        />
      </Routes>
    </>
  );
}

export default App;
