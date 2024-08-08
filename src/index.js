import express, { urlencoded } from "express";
import { config } from "dotenv";
import dbConnect from "./config/dbConnect.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import signupRoute from "./routes/Signup.routes.js";
import loginRoute from "./routes/Login.routes.js";

config();

const app = express();
const port = process.env.port;

dbConnect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use("/api", signupRoute);
app.use("/api", loginRoute);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});
