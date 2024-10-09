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
            expect(response.body.msg).toBe(
              "User already registered for this event"
            );
          });
      });
  });
});
describe("POST api/users", () => {
  test("Should respond with 201 and return the new user", () => {
    const newUser = {
      name: "john_doe",
      email: "john.doe@example.com",
      phone_number: "01234567899",
      staff: true,
    };
    return request(app)
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .then((response) => {
        expect(response.body.newUser).toHaveProperty("id");
        expect(newUser).toEqual({
          name: response.body.newUser.name,
          email: response.body.newUser.email,
          phone_number: response.body.newUser.phone_number,
          staff: response.body.newUser.staff,
        });
      });
  });
  describe("Error handling for POST /api/users", () => {
    const requiredFields = ["name", "email", "phone_number", "staff"];
    test.each(requiredFields)(
      "should respond with 400 bad request when %s is missing",
      (missingField) => {
        const newUser = {
          name: "john_doe",
          email: "john.doe@example.com",
          phone_number: "01234567899",
          staff: true,
        };

        delete newUser[missingField];

        return request(app)
          .post("/api/users")
          .send(newUser)
          .expect(400)
          .then((response) => {
            expect(response.body.msg).toBe("content missing from body");
          });
      }
    );
  });
});
describe("PATCH api/events/:id", () => {
  const validEventId = 1;
  const invalidEventId = 9999;
  const newEventData = {
    event_name: "Updated Event Name",
    event_time: "2024-11-15T18:00:00Z",
    location: "New Location",
  };
  test("Should return 200 and the updated event", () => {
    return request(app)
      .patch(`/api/events/${validEventId}`)
      .send(newEventData)
      .expect(200)
      .then((response) => {
        expect(response.body.msg).toBe("Event updated");
        expect(response.body.event).toHaveProperty("id", validEventId);
        expect(response.body.event).toHaveProperty(
          "event_name",
          "Updated Event Name"
        );
        expect(new Date(response.body.event.event_time).toISOString()).toBe(
          "2024-11-15T18:00:00.000Z"
        );
        expect(response.body.event).toHaveProperty("location", "New Location");
      });
  });
  test("Should return 400 when event ID is invalid", () => {
    return request(app)
      .patch(`/api/events/notanumber`)
      .send(newEventData)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Bad Request");
      });
  });

  test("Should return 404 when event does not exist", () => {
    return request(app)
      .patch(`/api/events/${invalidEventId}`)
      .send(newEventData)
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("Event not found");
      });
  });
});
describe("PATCH /api/users/:id", () => {
  const validUserId = 1; // Assuming this user ID exists in the database
  const invalidUserId = "invalid"; // Not a valid ID
  const nonExistentUserId = 9999; // Assuming this user ID does not exist
  const updatedUserData = {
    name: "Updated User Name",
    email: "updateduser@example.com",
  };

  test("Should return 200 and the updated user", () => {
    return request(app)
      .patch(`/api/users/${validUserId}`)
      .send(updatedUserData)
      .expect(200)
      .then((response) => {
        expect(response.body.msg).toBe("User updated");
        expect(response.body.user).toHaveProperty("id", validUserId);
        expect(response.body.user).toHaveProperty("name", updatedUserData.name);
        expect(response.body.user).toHaveProperty(
          "email",
          updatedUserData.email
        );
      });
  });

  test("Should return 400 when user ID is invalid", () => {
    return request(app)
      .patch(`/api/users/${invalidUserId}`)
      .send(updatedUserData)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Invalid user ID");
      });
  });

  test("Should return 404 when user does not exist", () => {
    return request(app)
      .patch(`/api/users/${nonExistentUserId}`)
      .send(updatedUserData)
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("User not found");
      });
  });
});
describe("GET /api/users/:id", () => {
  const validUserId = 1;
  const invalidUserId = 9999;
  const invalidUserIdString = "invalid_id";

  const testUser = {
    id: validUserId,
    name: "David",
    email: "david@fmail.com",
    phone_number: "07847263857",
    staff: true,
  };

  test("Should return user data when user exists", () => {
    return request(app)
      .get(`/api/users/${validUserId}`)
      .expect(200)
      .then((response) => {
        expect(response.body.user).toHaveProperty("id", testUser.id);
        expect(response.body.user).toHaveProperty("name", testUser.name);
        expect(response.body.user).toHaveProperty("email", testUser.email);
        expect(response.body.user).toHaveProperty(
          "phone_number",
          testUser.phone_number
        );
        expect(response.body.user).toHaveProperty("staff", testUser.staff);
      });
  });

  test("Should return 404 when user does not exist", () => {
    return request(app)
      .get(`/api/users/${invalidUserId}`)
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("User not found");
      });
  });

  test("Should return 400 for an invalid user ID format", () => {
    return request(app)
      .get(`/api/users/${invalidUserIdString}`)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("Invalid user ID");
      });
  });
});
describe("GET /api/users/:id/events", () => {
  const validUserId = 1; // Assuming this is a valid user ID
  const validEventId = 1; // Assuming this is a valid event ID
  const invalidUserId = 9999; // An ID that does not exist in the database

  const eventToRegister = {
    user_id: validUserId,
  };

  test("Should return all events a user is attending", () => {
    return request(app)
      .post(`/api/events/${validEventId}/register`)
      .send(eventToRegister)
      .expect(200)
      .then(() => {
        return request(app)
          .get(`/api/users/${validUserId}/events`)
          .expect(200)
          .then((response) => {
            expect(response.body).toBeInstanceOf(Array);
            expect(response.body).toHaveLength(1);
            const event = response.body[0];
            expect(event).toHaveProperty("id", validEventId);
            expect(event).toHaveProperty("event_name");
            expect(event).toHaveProperty("event_time");
            expect(event).toHaveProperty("location");
          });
      });
  });
  test("Should return 404 when user does not exist", () => {
    return request(app)
      .post(`/api/events/${validEventId}/register`)
      .send(eventToRegister)
      .expect(200)
      .then(() => {
        return request(app)
          .get(`/api/users/${invalidUserId}/events`)
          .expect(404)
          .then((response) => {
            expect(response.body.msg).toBe("User not found");
          });
      });
  });
});
