import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; 
import EventsList from "./components/EventsList"; 
import SingleEvent from "./components/SingleEvent"; 
import StaffPage from "./components/StaffPage"; 
import LoginPage from "./components/LoginPage"; 
import ProtectedRoute from "./components/ProtectedRoute"; 

function App() {
  return (
    <AuthProvider>
      <Router>
        <h1>EVENTS PLATFORM</h1>
        <Routes>
          <Route path="/" element={<EventsList />} />
          <Route path="/events/:event_id" element={<SingleEvent />} />
          <Route path="/login" element={<LoginPage />} /> 
          <Route
            path="/staff"
            element={<ProtectedRoute element={<StaffPage />} />} 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
