import "./App.css";
import {EventsList} from "./components/EventsList";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <h1>EVENTS PLATFORM</h1>
      <Routes>
        <Route path="/" element={<EventsList />} />
      </Routes>
    </>
  );
}

export default App;