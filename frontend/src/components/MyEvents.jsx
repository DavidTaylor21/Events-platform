import React, { useState, useEffect, useContext } from "react";
import { getUsersEvents } from "../../api";
import { UserContext } from "./UserContext";
import { convertDate } from "../../utils";
import { AddEventToGoogle } from "./AddEventToGoogle";
import { RemoveUserFromEventButton } from "./RemoveUserFromEventButton";

export const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isGoogleLogin, setIsGoogleLogin] = useState(
    localStorage.getItem("googleAccessToken")
  );
  const { loggedInUser } = useContext(UserContext);

  useEffect(() => {
    const fetchUserEvents = async () => {
      setLoading(true);
      try {
        const events = await getUsersEvents(loggedInUser.id);
        setEvents(events);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserEvents();
  }, [loggedInUser]);

  const handleRemoveSuccess = (eventId) => {
    setEvents((prevEvents) =>
      prevEvents.filter((event) => event.id !== eventId)
    );
  };

  if (loading) {
    return <div>Loading your events...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="signed-up-events">
      <h2>Your Signed-Up Events</h2>
      {events.length === 0 ? (
        <p>You have not signed up for any events yet.</p>
      ) : (
        <ul>
          {events.map((event) => (
            <li key={event.id} className="event-item">
              <div className="event-content">
                <div className="event-details">
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                  <p>Date: {convertDate(event.start_time)}</p>
                  <p>Location: {event.location}</p>
                  {isGoogleLogin ? (
                    <AddEventToGoogle event={event} />
                  ) : (
                    <p>Login with Google to add this event to your calendar.</p>
                  )}
                </div>
                <div className="remove-button">
                  <RemoveUserFromEventButton
                    eventId={event.id}
                    userId={loggedInUser.id}
                    onSuccess={handleRemoveSuccess}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
