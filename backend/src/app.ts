import express, { Request, Response } from "express";
import { postNewEvent, getAllEvents } from "../controllers/events.controller";
const app = express();

app.use(express.json());

app.get("/", (request: Request, response: Response) => {
  response.status(200).send("Hello World");
});

app.post("/events", postNewEvent);
app.get("/events", getAllEvents);



export default app;
