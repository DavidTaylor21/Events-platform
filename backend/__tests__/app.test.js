import request from "supertest";
import app from "../src/app";
import { seedDb } from "../db/seed";
import pool from "../db/connection";

beforeEach(async () => {
  await seedDb();
});

afterAll(async () => {
  await pool.end();
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
        response.body.events.forEach((event) => {
          expect(typeof event.id).toBe("number");
          expect(typeof event.event_name).toBe("string");
          expect(typeof event.location).toBe("string");
          expect(typeof event.event_time).toBe("string");
          expect(typeof event.price).toBe("string");
          expect(typeof event.capacity).toBe("number");
        });
      });
  });
});
describe("Test for endpoints that dont exist", () => {
  it("should return an error message of page not found", () => {
    return request(app)
      .get("/api/endpointdoesntexist")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("Page not found");
      });
  });
});
describe("GET /api/events/:event_id", () => {
  test("SHould respond an object corresponding to the given event id", () => {
    return request(app)
      .get("/api/events/1")
      .expect(200)
      .then((response) => {
        expect(response.body.event.id).toBe(1);
        expect(typeof response.body.event.event_name).toBe("string");
        expect(typeof response.body.event.location).toBe("string");
        expect(typeof response.body.event.event_time).toBe("string");
        expect(typeof response.body.event.price).toBe("string");
        expect(typeof response.body.event.capacity).toBe("number");
        expect(typeof response.body.event.spacesLeft).toBe("number");
      });
  });
});
test("Should respond with 404 and message event not found for event id given that does not exist", () => {
  return request(app)
    .get("/api/events/9999999")
    .expect(404)
    .then((response) => {
      expect(response.body.msg).toBe("article not found");
    });
});
test("Should respond with 400 and message bad request for event id that is not a number", () => {
  return request(app)
    .get("/api/events/notanumber")
    .expect(400)
    .then((response) => {
      expect(response.body.msg).toBe("Bad request");
    });
});
describe("POST /api/events", () => {
  test("should respond with 201 and return the new event", () => {
    const newEvent = {
      event_name: "NewEvent",
      location: "Buckingham Palace, London, Spain",
      event_time: "2026-07-14T08:00:00.000Z",
      price: "7263.54",
      capacity: 2726,
    };
    return request(app)
      .post("/api/events")
      .send(newEvent)
      .expect(201)
      .then((response) => {
        expect(response.body.newEvent).toHaveProperty("id");

        expect(newEvent).toEqual({
          event_name: response.body.newEvent.event_name,
          location: response.body.newEvent.location,
          event_time: response.body.newEvent.event_time,
          price: response.body.newEvent.price,
          capacity: response.body.newEvent.capacity,
        });
      });
  });

  describe("Error handling for POST /api/events", () => {
    const requiredFields = [
      "event_name",
      "location",
      "event_time",
      "price",
      "capacity",
    ];
    test.each(requiredFields)(
      "should respond with 400 bad request when %s is missing",
      (missingField) => {
        const newEvent = {
          event_name: "NewEvent",
          location: "Buckingham Palace, London, Spain",
          event_time: "2026-07-14T08:00:00.000Z",
          price: "7263.54",
          capacity: 2726,
        };

        delete newEvent[missingField];

        return request(app)
          .post("/api/events")
          .send(newEvent)
          .expect(400)
          .then((response) => {
            expect(response.body.msg).toBe("content missing from body");
          });
      }
    );
  });
});
describe("POST /api/events/:id/users", () => {
  const validEventId = 2;
  const validUserId = 1;

  test("should respond with 200 and success message when user is added to event", () => {
    return request(app)
      .post(`/api/events/${validEventId}/register`)
      .send({ user_id: validUserId })
      .expect(200)
      .then((response) => {
        expect(response.body.msg).toBe("User submitted to event");
      });
  });

  test("should respond with 400 when user_id is missing from the request body", () => {
    return request(app)
      .post(`/api/events/${validEventId}/register`)
      .send({})
      .expect(400)
      .then((response) => {
        console.log(response.body)
        expect(response.body.msg).toBe("User ID is required");
      });
  });

  test("should respond with 400 when event_id is not a valid number", () => {
    return request(app)
      .post(`/api/events/notanumber/register`)
      .send({ user_id: validUserId })
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Invalid event ID");
      });
  });

  test("should respond with 404 when event_id does not exist", () => {
    return request(app)
      .post(`/api/events/9999999/register`)
      .send({ user_id: validUserId })
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("Event not found");
      });
  });
  test("Should respond with 409 when user is already registered for an event", () => {
    return request(app)
      .post(`/api/events/${validEventId}/register`) 
      .send({ user_id: validUserId })
      .expect(200)
      .then(() => {
        return request(app)
          .post(`/api/events/${validEventId}/register`)
          .send({ user_id: validUserId })
          .expect(409) 
          .then((response) => {
            expect(response.body.msg).toBe("User already registered for this event");
          });
      });
  });
});
