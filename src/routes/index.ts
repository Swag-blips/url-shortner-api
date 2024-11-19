import { Express, Request, Response } from "express";
import {
  createShortUrl,
  getAnalytics,
  handleRedirect,
} from "../controller/shortUrl.controller";
import validateResource from "../middleware/validateResource";
import shortUrlSchema from "../schemas/createShortUrl.schema";

function routes(app: Express) {
  app.post("/api/url", validateResource(shortUrlSchema), createShortUrl);
  app.get("/api/url/:shortId", handleRedirect);
  app.get("/api/analytics", getAnalytics);
  app.get("/", (req:Request, res:Response) => {
    res.send("Hello cronJob")
  })
}

export default routes;
