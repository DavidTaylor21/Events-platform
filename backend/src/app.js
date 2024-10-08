import { postNewEvent, getAllEvents, getEventById , postUserToEvent} from "../controllers/events.controller.js";
import {postNewUser} from "../controllers/users.controller.js"
import express from "express"
import cors from "cors"

const app = express();

app.use(cors())
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

app.post("/events", postNewEvent);
app.get("/events", getAllEvents);
app.get("/events/:id", getEventById)
app.post("/events/:id/register", postUserToEvent)

app.post("/users", postNewUser)

export default app;
