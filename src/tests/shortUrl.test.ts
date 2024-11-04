import request from "supertest";
import mongoose from "mongoose";
import { app } from "../server";
import shortUrl from "../models/shortUrl.model";

beforeEach(async () => {
  await mongoose.connect(process.env.MONGO_URI as string);
});

describe("POST /api/url", () => {
  it("returns status code 201 if the destination is passed", async () => {
    const res = await request(app)
      .post("/api/url")
      .send({ destination: "https://devlinks.space" });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("newUrl");
    expect(res.body.newUrl).toHaveProperty("_id");
    expect(res.body.newUrl.destination).toBe("https://devlinks.space");
  });
});

afterEach(async () => {
  await shortUrl.deleteMany({});
  await mongoose.connection.close();
});
