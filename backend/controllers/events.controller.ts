import { Request, Response } from "express";
import { insertNewEvent, selectAllEvents } from "../models/events.model";

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
