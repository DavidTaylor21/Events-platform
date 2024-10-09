import pool from "./connection.js";

async function createEventsTable() {
  const createEventsTableQuery = `
    CREATE TABLE IF NOT EXISTS events (
      id SERIAL PRIMARY KEY,
      event_name VARCHAR(255) NOT NULL,
      location VARCHAR(255) NOT NULL,
      event_time TIMESTAMP NOT NULL,
      price DECIMAL(10, 2) NOT NULL,
      capacity INTEGER NOT NULL
    );
  `;
  await pool.query(createEventsTableQuery);
}

async function createUsersTable() {
  const createUsersTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
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
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
      UNIQUE (user_id, event_id)
    );
  `;
  await pool.query(createUserEventsTableQuery);
}

export async function seedDb() {
  try {

    await pool.query(`
      DROP TABLE IF EXISTS user_events CASCADE;
      DROP TABLE IF EXISTS events CASCADE;
      DROP TABLE IF EXISTS users CASCADE;
    `);

    await createEventsTable();
    await createUsersTable();
    await createUserEventsTable();

    const events = [
      {
        event_name: "Concert in the Park",
        location: "Hyde Park, London",
        event_time: "2024-07-14T18:00:00.000Z",
        price: "50.00",
        capacity: 1000,
      },
      {
        event_name: "Tech Conference",
        location: "ExCeL London",
        event_time: "2024-08-20T09:00:00.000Z",
        price: "250.00",
        capacity: 5000,
      },
      {
        event_name: "Food Festival",
        location: "Southbank Centre",
        event_time: "2024-09-10T12:00:00.000Z",
        price: "15.00",
        capacity: 3000,
      },
      {
        event_name: "Art Exhibition",
        location: "Tate Modern",
        event_time: "2024-10-01T10:00:00.000Z",
        price: "20.00",
        capacity: 2000,
      },
      {
        event_name: "Stand-Up Comedy Night",
        location: "The Comedy Store",
        event_time: "2024-11-05T20:00:00.000Z",
        price: "30.00",
        capacity: 400,
      },
    ];

    const insertEventQuery = `
      INSERT INTO events (event_name, location, event_time, price, capacity)
      VALUES ($1, $2, $3, $4, $5)
    `;

    for (const event of events) {
      const values = [
        event.event_name,
        event.location,
        event.event_time,
        event.price,
        event.capacity,
      ];
      await pool.query(insertEventQuery, values);
    }

    const newUser = ["David", "david@fmail.com", "07847263857", true];
    const insertUserQuery = `
      INSERT INTO users (name, email, phone_number, staff)
      VALUES ($1, $2, $3, $4)
    `;
    await pool.query(insertUserQuery, newUser);
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}
