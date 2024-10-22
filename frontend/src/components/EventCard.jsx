import { convertDate } from "../../utils";
import { Link } from "react-router-dom";

export const EventCard = ({ event }) => {
  return (
    <>
      <p className="event-name">{event.event_name}</p>
      <p className="event-location">{event.location}</p>
      <p className="event-date">{convertDate(event.event_time)}</p>
      <p className="event-price">£{event.price}</p>

      <Link to={`/events/${event.id}`} className="event-link">
        <button className="event-button">Event details</button>
      </Link>
    </>
  );
};
