import express from "express";
// import config from "config";
import routes from "./routes";
import connectMongo from "./db/db";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

export const app = express();

const port = process.env.PORT;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
});

app.use(limiter);

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
// const port = config.get("port");

app.listen(port, () => {
  console.log("Application listening on port ", port);
  connectMongo();
  routes(app);
});
