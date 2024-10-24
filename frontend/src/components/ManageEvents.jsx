import React, { useEffect, useState } from "react";
import { getAllEvents , deleteEvent} from "../../api";

export const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  const fetchEvents = () => {
    getAllEvents()
      .then((response) => {
        setEvents(response);
        setError(null);
      })
      .catch((error) => {
        setError(error);
      });
  };

  const handleDeleteEvent = (eventId) => {
    deleteEvent(eventId)
      .then(() => {
        setEvents((prevEvents) =>
          prevEvents.filter((event) => event.id !== eventId)
        );
      })
      .catch((error) => {
        setError(error);
      });
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div>
      <h2>Your Events</h2>
      {error && <p className="error-message">{error.msg}</p>}
      {events ? (
        <ul>
          {events.map((event) => (
            <li key={event.id}>
              <h3>{event.event_name}</h3>
              <p>
                Date: {new Date(event.start_time).toLocaleString()} <br />
                Location: {event.location || "Not specified"}
              </p>
              <button onClick={() => handleDeleteEvent(event.id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No events found.</p>
      )}
    </div>
  );
};
