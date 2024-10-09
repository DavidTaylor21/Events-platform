import { postNewEvent, getAllEvents, getEventById , postUserToEvent, patchEvent} from "../controllers/events.controller.js";
import {postNewUser, patchUser, getUserById} from "../controllers/users.controller.js"
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
app.patch("/api/events/:id", patchEvent)

app.post("/api/users", postNewUser)
app.patch("/api/users/:id", patchUser)
app.get("/api/users/:id", getUserById)

app.all("/api/*", (req,res)=>{
  res.status(404).send({msg : "Page not found"})
})

export default app;
