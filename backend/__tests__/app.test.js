import request from "supertest";
import app from "../src/app";

let server;

beforeAll((done) => {
  server = app.listen(3000, done);
});

afterAll((done) => {
  server.close(done);
});

describe("app test", () => {
  it("should respond with Hello World", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((response) => {
        expect(response.text).toBe("Hello World");
      });
  });
});

describe("GET /api/events", () => {
  it("should return 200 and an array of events", () => {
    return request(app)
      .get("/api/events")
      .expect(200)
      .then((response) => {
        expect(Array.isArray(response.body.events)).toBe(true);
      });
  });
});
