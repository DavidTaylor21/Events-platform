import {
  insertNewEvent,
  selectAllEvents,
  selectEventById,
  insertUserToEvent,
  editEvent,
  deleteEventById,
  deleteUserFromEvent
} from "../models/events.model.js";
export const postNewEvent = (req, res) => {
  insertNewEvent(req.body)
    .then((newEvent) => {
      res.status(201).send({ msg: "Event posted successfully", newEvent });
    })
    .catch((err) => {
      err.msg && err.status
        ? res.status(err.status).send({ msg: err.msg })
        : res.status(500).send({ msg: "Internal server error" });
    });
};

export const getAllEvents = (req, res) => {
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
  const id = req.params.id;

  selectEventById(id)
    .then((event) => {
      if (event.length === 0) {
        return res.status(404).send({ msg: "Event not found" });
      }
      res.status(200).send({ event });
    })
    .catch((err) => {
      return err.msg && err.status
        ? res.status(err.status).send({ msg: err.msg })
        : res.status(500).send({ msg: "Error fetching event" });
    });
};

export const postUserToEvent = (req, res) => {
  const { user_id } = req.body;
  const event_id = parseInt(req.params.id, 10);

  if (typeof user_id === "undefined") {
    return res.status(400).send({ msg: "User ID is required" });
  }

  if (isNaN(user_id)) {
    return res
      .status(400)
      .send({ msg: "Bad Request: user_id must be a number" });
  }

  if (isNaN(event_id)) {
    return res.status(400).send({ msg: "Invalid event ID" });
  }

  insertUserToEvent(user_id, event_id)
    .then((result) => {
      res.status(200).send({ msg: "User submitted to event", result });
    })
    .catch((err) => {
      if (err.code === "P2002") {
        return res
          .status(409)
          .send({ msg: "User already registered for this event" });
      }

      if (err.msg && err.status) {
        return res.status(err.status).send({ msg: err.msg });
      }

      return res
        .status(500)
        .send({ msg: "Error inserting user to event", err });
    });
};

export const patchEvent = (req, res) => {
  const eventId = parseInt(req.params.id, 10);
  const updatedData = req.body;
  if (isNaN(eventId)) {
    return res.status(400).send({ msg: "Bad Request" });
  }

  editEvent(eventId, updatedData)
    .then((updatedEvent) => {
      return res
        .status(200)
        .send({ msg: "Event updated", event: updatedEvent });
    })
    .catch((err) => {
      if (err.msg && err.status) {
        return res.status(err.status).send({ msg: err.msg });
      }
      return res.status(500).send({ msg: "Error updating event" });
    });
};
export const deleteEvent = (req, res) => {
  const eventId = req.params.id;
  deleteEventById(eventId)
    .then(() => {
      res.status(200).send({ msg: "Event successfully deleted" });
    })
    .catch((err) => {
      if (err.code === "P2025") {
        return res.status(400).send({ msg: "event not found" });
      } else {
        return err.msg && err.status
          ? res.status(err.status).send({ msg: err.msg })
          : res.status(500).send({ msg: "Error deleting event" });
      }
    });
};
export const removeUserFromEvent = (req,res)=>{
  const eventId = req.params.id
  const { user_id } = req.body;
  deleteUserFromEvent(eventId, user_id)
    .then(() => {
      res.status(200).send({ msg: "User successfully removed from event" });
    })
    .catch((err) => {
      if (err.code === "P2025") {
        return res.status(400).send({ msg: "event not found" });
      } else {
        return err.msg && err.status
          ? res.status(err.status).send({ msg: err.msg })
          : res.status(500).send({ msg: "Error removing user from event" });
      }
    });
  }
