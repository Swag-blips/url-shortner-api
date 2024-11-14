import express from "express";
// import config from "config";
import routes from "./routes";
import connectMongo from "./db/db";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import cors from "cors";
import swaggerJsDoc from "swagger-jsdoc";
import swagger from "swagger-ui-express";
import options from "./swagger";

dotenv.config();

export const app = express();

const swaggerSpec = swaggerJsDoc(options);
app.use("/api-docs", swagger.serve, swagger.setup(swaggerSpec));
const port = process.env.PORT;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  validate: { xForwardedForHeader: false },
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
