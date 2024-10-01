import { Request, Response } from "express";
import {
  insertNewEvent,
  selectAllEvents,
  selectEventById,
  insertUserToEvent,
} from "../models/events.model";
import { MappedEvent } from "../db/getEventData";

export const postNewEvent = (req: Request, res: Response) => {
  insertNewEvent(req.body)
    .then(() => {
      res.status(201).send({ msg: "posted" });
    })
    .catch((err: Error) => {
      res.status(500).send({ msg: "error" });
    });
};

export const getAllEvents = (req: Request, res: Response) => {
  selectAllEvents()
    .then((events: []) => {
      res.status(200).send({ events });
    })
    .catch((err: Error) => {
      res.status(500).send({ msg: "Could not find Events" });
    });
};

export const getEventById = (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  selectEventById(id)
    .then((event: any) => {
      res.status(200).send({ event: event[0] });
    })
    .catch((err: Error) => {
      res.status(500).send({ err });
    });
};

export const postUserToEvent = (req: Request, res: Response) => {
  const { user_id } = req.body;
  const event_id: number = parseInt(req.params.id);
  insertUserToEvent(user_id, event_id)
    .then(() => {
      res.status(200).send({ msg: "User submitted to event" });
    })
    .catch((err: Error) => {
      res.status(500).send({ err });
    });
};
