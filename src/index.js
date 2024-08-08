import express from "express";
import { config } from "dotenv";
import dbConnect from "./config/dbConnect.js";

config();

const app = express();
const port = process.env.port;

dbConnect();

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});
