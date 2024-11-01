import { Request, Response } from "express";
import shortUrl from "../models/shortUrl.model";
import analytics from "../models/analytics.model";

export async function createShortUrl(req: Request, res: Response) {
  const { destination } = req.body;

  const newUrl = await shortUrl.create({ destination });

  res.send({ newUrl });
  return;
}

export async function handleRedirect(req: Request, res: Response) {
  const { shortId } = req.params;

  const short = await shortUrl.findOne({ shortId }).lean();

  if (!short) {
    res.status(404);
    return;
  }

  analytics.create({ shortUrl: short._id });

  res.redirect(short?.destination);
  return;
}

export async function getAnalytics(req: Request, res: Response) {
  const data = await analytics.find({}).lean();

  res.send(data);

  return;
}
