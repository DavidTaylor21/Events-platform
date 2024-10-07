import request from "supertest";
import app from "../src/app";

let server

beforeAll((done) => {
  server = app.listen(3000, done);
});

afterAll((done) => {
  server.close(done);
});

describe("app test", () => {
  it("should respond with Hello World", () => {
    return request(app)
      .get("/")
      .expect(200)
      .then((response) => {
        expect(response.text).toBe("Hello World");
      });
  });
});
