import { Express, Request, Response } from "express";
import { createShortUrl } from "../controller/shortUrl.controller";

function routes(app: Express) {
  app.get("/", (req: Request, res: Response) => {
    res.send("app is working");
    return;
  });
  app.post("/api/url", createShortUrl);
}

export default routes;
