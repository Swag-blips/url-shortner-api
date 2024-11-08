import request from "supertest";
import mongoose from "mongoose";
import { app } from "../server";
import shortUrl from "../models/shortUrl.model";
import analytics from "../models/analytics.model";

jest.setTimeout(60000);
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

  it("returns status code 404 if the destination is not passed", async () => {
    const res = await request(app).post("/api/url").send({});
    expect(res.statusCode).toEqual(400);
  });
});

describe("GET /:shortId", () => {
  let testShortId: string;

  beforeEach(async () => {
    const shortEntry = await shortUrl.create({
      shortId: "23452",
      destination: "https://devlinks.space",
    });

    testShortId = shortEntry.shortId;
  });
  it("redirects the user to the specific destination url", async () => {
    const res = await request(app).get(`/api/url/${testShortId}`);

    expect(res.statusCode).toEqual(302);
    expect(res.header.location).toEqual("https://devlinks.space");
  });

  it("returns 404 if the shortId is invalid", async () => {
    const res = await request(app).get("/api/url/356373");

    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual({ error: "Not found" });
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
