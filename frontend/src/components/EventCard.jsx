import { convertDate } from "../../utils";
export const EventCard = ({ event }) => {
  return (
    <>
      <p>{event.event_name}</p>
      <p>{event.location}</p>
      <p>{convertDate(event.event_time)}</p>
      <p>£{event.price}</p>
      <p>Spaces remaining: {event.capacity}</p>
    </>
  );
};
