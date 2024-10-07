import { getEventsInLondon } from "./getEventData.js";
const pool = require("./connection.js");

async function createEventsTable() {
  const createEventsTableQuery = `
    DROP TABLE IF EXISTS events CASCADE; 
    CREATE TABLE IF NOT EXISTS events (
      id SERIAL PRIMARY KEY,
      event_name VARCHAR(255),
      location VARCHAR(255),
      event_time TIMESTAMP,
      price DECIMAL(10, 2),
      capacity INTEGER
    );
  `;
  await pool.query(createEventsTableQuery);
}

async function createUsersTable() {
  const createUsersTableQuery = `
    DROP TABLE IF EXISTS users CASCADE; 
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255),
      email VARCHAR(255),
      phone_number VARCHAR(255),
      staff BOOLEAN
    );
  `;
  await pool.query(createUsersTableQuery);
}

async function createUserEventsTable() {
  const createUserEventsTableQuery = `
    CREATE TABLE IF NOT EXISTS user_events (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL,
      event_id INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (event_id) REFERENCES events(id),
      UNIQUE (user_id, event_id)
    );
  `;
  await pool.query(createUserEventsTableQuery);
}

async function seedDb() {
  try {

    await createEventsTable();
    await createUsersTable();
    await createUserEventsTable();

    const events = await getEventsInLondon();
    const insertQuery = `
      INSERT INTO events (event_name, location, event_time, price, capacity)
      VALUES ($1, $2, $3, $4, $5)
    `;

    for (const event of events) {
      const values = [
        event.eventName,
        event.eventLocation,
        new Date(event.eventTime),
        event.price,
        event.capacity,
      ];
      await pool.query(insertQuery, values);
    }

    console.log(`Inserted ${events.length} events into the database.`);
  } catch (error) {
    console.error("Error seeding events:", error);
  } finally {
    await pool.end();
  }
}

seedDb();

