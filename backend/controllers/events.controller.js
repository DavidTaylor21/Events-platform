
import {
  insertNewEvent,
  selectAllEvents,
  selectEventById,
  insertUserToEvent,
} from "../models/events.model.js";

export const postNewEvent = (req, res) => {
  insertNewEvent(req.body)
    .then(() => {
      res.status(201).send({ msg: "Event posted successfully" });
    })
    .catch((err) => {
      console.error("Error posting event:", err);
      res.status(500).send({ msg: "Internal server error" });
    });
};

export const getAllEvents = (req, res)=> {
  selectAllEvents()
    .then((events) => {
      res.status(200).send({ events });
    })
    .catch((err) => {
      console.error("Error fetching events:", err);
      res.status(500).send({ msg: "Error fetching events" });
    });
};

export const getEventById = (req, res) => {
  const id = parseInt(req.params.id, 10);

  selectEventById(id)
    .then((event) => {
      if (event.length === 0) {
        return res.status(404).send({ msg: "Event not found" });
      }
      res.status(200).send({ event: event[0] });
    })
    .catch((err) => {
      console.error("Error fetching event by ID:", err);
      res.status(500).send({ msg: "Error fetching event" });
    });
};

export const postUserToEvent = (req, res) => {
  const { user_id } = req.body;
  const event_id = parseInt(req.params.id);
  insertUserToEvent(user_id, event_id)
    .then(() => {
      res.status(200).send({ msg: "User submitted to event" });
    })
    .catch((err) => {
      res.status(500).send({ err });
    });
};
