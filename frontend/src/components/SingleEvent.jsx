import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; 
import { getEventById } from "../../api"; 
import Loading from "./Loading"; 
import { convertDate } from "../../utils";

export const SingleEvent = () => {
  const { event_id } = useParams(); 
  const [isLoading, setIsLoading] = useState(true);
  const [eventData, setEventData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    getEventById(event_id)
      .then((data) => {
        console.log(data);
        setEventData(data);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [event_id]); 

  if (isLoading) return <Loading />; 
  if (error) return <p>Error loading event: {error.message}</p>;

  return (
    <div>
      <h2>{eventData.event_name}</h2>
      <p>Location: {eventData.location}</p>
      <p>Date: {convertDate(eventData.event_time)}</p>
      <p>Price: £{eventData.price}</p>
      <p>Spaces remaining: {eventData.capacity}</p>
    </div>
  );
};
