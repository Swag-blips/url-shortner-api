import { Express, Request, Response } from "express";
import {
  createShortUrl,
  getAnalytics,
  handleRedirect,
} from "../controller/shortUrl.controller";
import validateResource from "../../middleware/validateResource";
import shortUrlSchema from "../schemas/createShortUrl.schema";

function routes(app: Express) {
  app.get("/", (req: Request, res: Response) => {
    res.send("app is working");
    return;
  });
  app.post("/api/url", validateResource(shortUrlSchema), createShortUrl);
  app.get("/:shortId", handleRedirect);
  app.get("/api/analytics", getAnalytics);
}

export default routes;
