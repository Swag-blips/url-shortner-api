import { Request, Response } from "express";
import shortUrl from "../models/shortUrl.model";
import analytics from "../models/analytics.model";

export async function createShortUrl(req: Request, res: Response) {
  try {
    const { destination } = req.body;

    const newUrl = await shortUrl.create({ destination });

    res.status(201).json({ newUrl });
    return;
  } catch (err: any) {
    console.log(
      `an error occured from createShortUrl controller ${createShortUrl} `
    );
    res.status(500).json({ message: "an error occured", err });
  }
}

export async function handleRedirect(req: Request, res: Response) {

  try {
    const { shortId } = req.params;

    const short = await shortUrl.findOne({ shortId }).lean();

    if (!short) {
      res.status(404).send({ error: "Not found" });
      return;
    }

    if (short.destination) {
      await analytics.create({ shortUrl: short._id });

      res.status(200).json(short);
    } else {
      res.status(404).json({ error: "ShortUrl not found" });
      return;
    }
  } catch (err: any) {
    console.log("An error occurred from handleRedirect controller");
    res.status(500).json({ message: "An error occurred", err });
  }
}

export async function getAnalytics(req: Request, res: Response) {
  try {
    const data = await analytics.find({}).lean();

    res.status(200).json(data);

    return;
  } catch (err: any) {
    console.log(`an error occured from getAnalytics controller ${err}`);
    res.status(500).json({ message: "an error occured", err });
  }
}
