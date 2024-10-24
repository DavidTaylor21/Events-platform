import React, { useState } from "react";
import { addEvent } from "../../api";

export const AddEvent = () => {
  const [eventData, setEventData] = useState({
    event_name: "",
    location: "",
    description: "",
    price: "0.00",
    capacity: "",
    start_time: "",
    end_time: "",
    timeZone: "Europe/London",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!eventData.event_name || !eventData.start_time || !eventData.end_time) {
      setError("Please fill out all required fields.");
      return;
    }

    addEvent(eventData)
      .then((response) => {
        setEventData({
          event_name: "",
          location: "",
          description: "",
          price: "0.00",
          capacity: "",
          start_time: "",
          end_time: "",
          timeZone: "Europe/London",
        });
        setMessage("Event successfully added");
        setError(null); 
      })
      .catch((error) => {
        setError("Failed to add the event. Please try again.");
        setMessage(""); 
      });
  };

  return (
    <div className="add-event-container">
      <h2>Add New Event</h2>
      {error && <p className="error-message">{error}</p>}
      {message && <p className="success-message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Event Name:</label>
          <input
            type="text"
            name="event_name"
            value={eventData.event_name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={eventData.location}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={eventData.description}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Spaces:</label>
          <input
            type="number"
            name="capacity"
            value={eventData.capacity}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Start Time:</label>
          <input
            type="datetime-local"
            name="start_time"
            value={eventData.start_time}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>End Time:</label>
          <input
            type="datetime-local"
            name="end_time"
            value={eventData.end_time}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit">Add Event</button>
      </form>
    </div>
  );
};

