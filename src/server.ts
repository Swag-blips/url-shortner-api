import express from "express";
import config from "config";
import routes from "./routes";
import connectMongo from "../db/db";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
const port = config.get("port");

app.listen(port, () => {
  console.log("Application listening on port ", port);
  connectMongo();
  routes(app);
});
