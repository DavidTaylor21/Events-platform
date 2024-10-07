import pool from "../db/connection.js";

export const insertNewEvent = (body) => {
  const { event_name, location, event_time, price, capacity } = body;

  if (
    typeof event_name !== "string" ||
    typeof location !== "string" ||
    typeof event_time !== "string" ||
    typeof price !== "number" ||
    typeof capacity !== "number"
  ) {
    return Promise.reject(new Error("Invalid input data"));
  }

  const queryStr = `INSERT INTO events (event_name, location, event_time, price, capacity) 
    VALUES ($1, $2, $3, $4, $5);`;

  const values = [event_name, location, event_time, price, capacity];

  return pool.query(queryStr, values).then((result) => {
    return result;
  });
};

export const selectAllEvents = () => {
  return pool
    .query("SELECT * FROM events;")
    .then((result) => {
      return result.rows;
    })
    .catch((error) => {
      console.error("Error fetching events:", error);
      throw error;
    });
};

export const selectEventById = (id) => {
  if (typeof id !== "number") {
    return Promise.reject(new Error("Invalid event ID"));
  }

  return pool
    .query("SELECT * FROM events WHERE id = $1", [id])
    .then((result) => {
      return result.rows;
    })
    .catch((error) => {
      console.error("Error fetching event by ID:", error);
      throw error;
    });
};

export const insertUserToEvent = (user_id, event_id) => {
  if (typeof user_id !== "number" || typeof event_id !== "number") {
    return Promise.reject(new Error("Invalid user ID or event ID"));
  }

  const queryStr = `INSERT INTO user_events (user_id, event_id) VALUES ($1, $2) 
   ON CONFLICT (user_id, event_id) DO NOTHING;`;

  const values = [user_id, event_id];

  return pool.query(queryStr, values).then((result) => {
    return result;
  });
};
