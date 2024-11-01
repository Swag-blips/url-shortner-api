import { Express, Request, Response } from "express";
import {
  createShortUrl,
  handleRedirect,
} from "../controller/shortUrl.controller";

function routes(app: Express) {
  app.get("/", (req: Request, res: Response) => {
    res.send("app is working");
    return;
  });
  app.post("/api/url", createShortUrl);
  app.get("/:shortId", handleRedirect);
}

export default routes;
