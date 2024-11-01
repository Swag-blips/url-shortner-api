import mongoose, { Document } from "mongoose";
import shortId from "shortid";

const newUrl = shortId.generate();

export interface ShortURL extends Document {
  shortId: string;
  destination: string;
}

const schema = new mongoose.Schema({
  shortId: {
    type: String,
    unique: true,
    required: true,
    default: newUrl,
  },
  destination: { type: String, required: true },
});

const shortUrl = mongoose.model<ShortURL>("shortUrl", schema);

export default shortUrl;
