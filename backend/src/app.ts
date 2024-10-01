import express, { Request, Response } from "express";
import { postNewEvent, getAllEvents, getEventById } from "../controllers/events.controller";
import {postNewUser} from "../controllers/users.controller"
const app = express();

app.use(express.json());

app.get("/", (request: Request, response: Response) => {
  response.status(200).send("Hello World");
});

app.post("/events", postNewEvent);
app.get("/events", getAllEvents);
app.get("/events/:id", getEventById)

app.post("/users", postNewUser)

export default app;
