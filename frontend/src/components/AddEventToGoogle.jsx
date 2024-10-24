import React, { useState } from "react";
import axios from "axios";
import { GoogleLoginButton } from "./GoogleLoginButton";

export const AddEventToGoogle = ({ event }) => {
  const accessToken = localStorage.getItem("googleAccessToken");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const checkForDuplicateEvent = (newEvent) => {
    if (!accessToken) {
      return Promise.resolve(false);
    }

    return axios
      .get("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        const isDuplicate = response.data.items.some((existingEvent) => {
          return (
            existingEvent.summary === newEvent.summary &&
            existingEvent.start.dateTime === newEvent.start.dateTime &&
            existingEvent.end.dateTime === newEvent.end.dateTime
          );
        });

        return isDuplicate;
      })
      .catch((error) => {
        return false;
      });
  };

  const createGoogleCalendarEvent = () => {
    if (!accessToken) {
      return;
    }

    const googleEvent = {
      summary: event.event_name,
      location: event.location,
      description: event.description,
      start: {
        dateTime: event.start_time,
        timeZone: event.timeZone,
      },
      end: {
        dateTime: event.end_time,
        timeZone: event.timeZone,
      },
    };

    checkForDuplicateEvent(googleEvent).then((isDuplicate) => {
      if (isDuplicate) {
        setErrorMessage("This event already exists in your Google Calendar.");
        return;
      }

      axios
        .post(
          "https://www.googleapis.com/calendar/v3/calendars/primary/events",
          googleEvent,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          setSuccessMessage(
            "Event successfully added to your Google Calendar!"
          );
          setErrorMessage("");
        })
        .catch((error) => {
          setErrorMessage(
            "Failed to add the event to your Google Calendar. Please try again."
          );
        });
    });
  };

  return (
    <div>
      {accessToken ? (
        <div>
          <button onClick={createGoogleCalendarEvent}>
            Add Event to Google Calendar
          </button>
          {successMessage && <p>{successMessage}</p>}
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </div>
      ) : (
        <div>
          <p>
            Please log in to your Google account to add events to your calendar.
          </p>
          <GoogleLoginButton />
        </div>
      )}
    </div>
  );
};
