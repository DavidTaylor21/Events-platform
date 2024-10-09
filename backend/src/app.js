import { postNewEvent, getAllEvents, getEventById , postUserToEvent} from "../controllers/events.controller.js";
import {postNewUser} from "../controllers/users.controller.js"
import express from "express"
import cors from "cors"

const app = express();

app.use(cors())
app.use(express.json());

app.get("/api", (req, res) => {
  res.status(200).send("Hello World");
});

app.post("/api/events", postNewEvent);
app.get("/api/events", getAllEvents);
app.get("/api/events/:id", getEventById)
app.post("/api/events/:id/register", postUserToEvent)

app.post("/api/users", postNewUser)

app.all("/api/*", (req,res)=>{
  res.status(404).send({msg : "Page not found"})
})

export default app;
