import { useState, useEffect} from "react";
import { getAllEvents } from "../../api";
import Loading from "./Loading";
import { EventCard } from "./EventCard";


export const EventsList = () => {
  const [allEvents, setAllEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    setIsLoading(true);
    setError(null);

    getAllEvents()
      .then((events) => {
        console.log(events)
        setAllEvents(events);
      })
      .catch((err) => {
        console.log(err)
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <p>Error fetching events: {error.message}</p>;
  }

  return (
    <ul>
      {allEvents.map((event) => (
        <li key={event.id}>
          <EventCard event={event} />
        </li>
      ))}
    </ul>
  );
};