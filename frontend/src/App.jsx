import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { EventsList } from "./components/EventsList";
import { SingleEvent } from "./components/SingleEvent";
import { LoginPage } from "./components/LoginPage";
import { UserContext } from "./components/UserContext";
import { useContext } from "react";

function App() {
  const { logout } = useContext(UserContext);

  const ProtectedRoute = ({ element }) => {
    return localStorage.getItem("eventsPlatformUser") ? (
      element
    ) : (
      <Navigate to="/login" />
    );
  };

  return (
    <>
      <h1>EVENTS PLATFORM</h1>
      <button onClick={logout}>Logout</button>
      <Routes>
        <Route
          path="/events"
          element={<ProtectedRoute element={<EventsList />} />}
        />
        <Route
          path="/events/:event_id"
          element={<ProtectedRoute element={<SingleEvent />} />}
        />

        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
