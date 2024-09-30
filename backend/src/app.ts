import express, { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use(express.json());

app.get("/", (request: Request, response: Response) => {
  response.status(200).send("Hello World");
});


export default app