"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createShortUrl = createShortUrl;
exports.handleRedirect = handleRedirect;
exports.getAnalytics = getAnalytics;
const shortUrl_model_1 = __importDefault(require("../models/shortUrl.model"));
const analytics_model_1 = __importDefault(require("../models/analytics.model"));
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
function createShortUrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { destination } = req.body;
            const newUrl = yield shortUrl_model_1.default.create({ destination });
            res.status(201).json({ newUrl });
            return;
        }
        catch (err) {
            console.log(`an error occured from createShortUrl controller ${createShortUrl} `);
            res.status(500).json({ message: "Internal server error" });
        }
    });
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
function handleRedirect(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { shortId } = req.params;
            const short = yield shortUrl_model_1.default.findOne({ shortId }).lean();
            if (!short) {
                res.status(404).json({ error: "Not found" });
                return;
            }
            if (short.destination) {
                yield analytics_model_1.default.create({ shortUrl: short._id });
                res.status(200).json({ destination: short.destination });
            }
            else {
                res.status(404).json({ error: "Destination URL not found" });
                return;
            }
        }
        catch (err) {
            console.log("An error occurred in handleRedirect controller");
            res.status(500).json({ message: "Internal server error" });
        }
    });
}
function getAnalytics(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield analytics_model_1.default.find({}).lean();
            res.status(200).json(data);
            return;
        }
        catch (err) {
            console.log(`an error occured from getAnalytics controller ${err}`);
            res.status(500).json({ message: "an error occured", err });
        }
    });
}
