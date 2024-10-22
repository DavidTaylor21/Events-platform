import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getEventById, signUpForEvent } from "../../api";
import Loading from "./Loading";
import { convertDate } from "../../utils";

export const SingleEvent = () => {
  const { event_id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [eventData, setEventData] = useState({});
  const [error, setError] = useState(null);
  const [signupError, setSignupError] = useState(null);
  const [signupSuccess, setSignupSuccess] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    setSignupError(null);
    setSignupSuccess(false);

    getEventById(event_id)
      .then((data) => {
        setEventData(data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [event_id]);

  const handleSignUp = () => {
    setSignupError(null);
    setSignupSuccess(false);
    const userData = JSON.parse(localStorage.getItem("eventsPlatformUser"));

    signUpForEvent(userData.id, event_id)
      .then(() => {
        setSignupSuccess(true);
        return getEventById(event_id);
      })
      .then((updatedData) => {
        setEventData(updatedData);
      })
      .catch((err) => {
        setSignupError(err.response.data.msg);
      });
  };

  if (isLoading) return <Loading />;
  if (error) return <p>Error loading event: {error.msg}</p>;

  return (
    <div className="single-event-container">
      <h2 className="single-event-title">{eventData.event_name}</h2>
      <p className="single-event-details">Location: {eventData.location}</p>
      <p className="single-event-details">
        Date: {convertDate(eventData.event_time)}
      </p>
      <p className="single-event-price">Price: £{eventData.price}</p>
      <p className="single-event-capacity">
        Spaces remaining: {eventData.spacesLeft}
      </p>
      <button onClick={handleSignUp} className="event-button">
        Sign Up
      </button>
      {signupSuccess && <p>Successfully signed up for the event!</p>}
      {signupError && <p className="error-message">{signupError}</p>}
    </div>
  );
};
