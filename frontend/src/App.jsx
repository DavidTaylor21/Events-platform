import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { EventsList } from "./components/EventsList";
import { SingleEvent } from "./components/SingleEvent";
import { LoginPage } from "./components/LoginPage";

function App() {
  return (
    <>
      <h1>EVENTS PLATFORM</h1>
      <Routes>
        <Route path="/" element={<EventsList />} />
        <Route path="/events/:event_id" element={<SingleEvent />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
