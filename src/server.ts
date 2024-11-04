import express from "express";
// import config from "config";
import routes from "./routes";
import connectMongo from "./db/db";
import dotenv from "dotenv";

dotenv.config();

export const app = express();

app.use(express.json());
// const port = config.get("port");

app.listen(4000, () => {
  console.log("Application listening on port ", 4000);
  connectMongo();
  routes(app);
});
