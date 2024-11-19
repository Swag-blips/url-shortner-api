"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const schema = new mongoose_1.default.Schema({
    shortId: {
        type: String,
        unique: true,
        required: true,
    },
    destination: { type: String, required: true },
});
const shortUrl = mongoose_1.default.model("shortUrl", schema);
exports.default = shortUrl;
