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
const supertest_1 = __importDefault(require("supertest"));
const mongoose_1 = __importDefault(require("mongoose"));
const server_1 = require("../server");
const shortUrl_model_1 = __importDefault(require("../models/shortUrl.model"));
const analytics_model_1 = __importDefault(require("../models/analytics.model"));
jest.setTimeout(60000);
let testShortId;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect(process.env.MONGO_URI);
    const shortEntry = yield shortUrl_model_1.default.create({
        shortId: "23452",
        destination: "https://www.devlinks.space",
    });
    testShortId = shortEntry.shortId;
}));
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () { }));
describe("POST /api/url", () => {
    it("returns status code 201 if the destination is passed", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.app)
            .post("/api/url")
            .send({ destination: "https://devlinks.space" });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty("newUrl");
        expect(res.body.newUrl).toHaveProperty("_id");
        expect(res.body.newUrl.destination).toBe("https://devlinks.space");
    }));
    it("returns status code 404 if the destination is not passed", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.app).post("/api/url").send({});
        expect(res.statusCode).toEqual(400);
    }));
});
describe("GET /:shortId", () => {
    it("redirects the user to the specific destination url", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.app).get(`/api/url/${testShortId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("destination");
    }));
    it("returns 404 if the shortId is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.app).get("/api/url/356373");
        expect(res.statusCode).toEqual(404);
        expect(res.body).toEqual({ error: "Not found" });
    }));
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield shortUrl_model_1.default.deleteMany({});
    yield analytics_model_1.default.deleteMany({});
    yield mongoose_1.default.connection.close();
}));
