import { convertDate } from "../../utils";
import {Link} from 'react-router-dom'
export const EventCard = ({ event }) => {
  return (
    <>
      <p>{event.event_name}</p>
      <p>{event.location}</p>
      <p>{convertDate(event.event_time)}</p>
      <p>£{event.price}</p>
      <Link to={`/events/${event.id}`}>  
      <button>Event details</button>
      </Link>
    </>
  );
};
