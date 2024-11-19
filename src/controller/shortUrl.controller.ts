import { Request, Response } from "express";
import shortUrl from "../models/shortUrl.model";
import analytics from "../models/analytics.model";
import shortid from "shortid";

/**
 * @swagger
 * /api/url:
 *   post:
 *     summary: Creates a new shortened URL
 *     tags:
 *       - URL Shortener
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - destination
 *             properties:
 *               destination:
 *                 type: string
 *                 format: uri
 *                 description: The original URL to be shortened
 *                 example: "https://www.example.com"
 *     responses:
 *       201:
 *         description: Short URL created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 newUrl:
 *                   type: object
 *                   properties:
 *                     shortId:
 *                       type: string
 *                       description: The generated short identifier
 *                       example: "abc123"
 *                     destination:
 *                       type: string
 *                       format: uri
 *                       description: The original URL
 *                       example: "https://www.example.com"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Destination URL is required"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"

 */

export async function createShortUrl(req: Request, res: Response) {
  const id = shortid.generate();

  try {
    const { destination } = req.body;

    const newUrl = await shortUrl.create({ shortId: id, destination });

    res.status(201).json({ newUrl });
    return;
  } catch (err: any) {
    console.log(
      `an error occured from createShortUrl controller ${createShortUrl} `
    );
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
}
/**
 * @swagger
 * /api/url/{shortId}:
 *   get:
 *     summary: Retrieves the destination URL
 *     parameters:
 *       - in: path
 *         name: shortId
 *         required: true
 *         description: The short URL ID (e.g., WWg2cNpDL)
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A JSON object containing the destination URL
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 destination:
 *                   type: string
 *                   example: "https://google.com"
 *       404:
 *         description: Destination URL not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Destination URL not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

export async function handleRedirect(req: Request, res: Response) {
  try {
    const { shortId } = req.params;

    const short = await shortUrl.findOne({ shortId }).lean();

    if (!short) {
      res.status(404).json({ error: "Not found" });
      return;
    }

    if (short.destination) {
      await analytics.create({ shortUrl: short._id });

      res.status(200).json({ destination: short.destination });
    } else {
      res.status(404).json({ error: "Destination URL not found" });
      return;
    }
  } catch (err: any) {
    console.log("An error occurred in handleRedirect controller");
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
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
