import { Express, Request, Response } from "express";

function routes(app: Express) {
  app.get("/", (req: Request, res: Response) => {
    res.send("app is working");
    return;
  });
}

export default routes;
