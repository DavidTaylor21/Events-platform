import { getEventsInLondon } from "./getEventData";
const pool = require("./connection");

async function createEventsTable() {
  const createTableQuery = `
    DROP TABLE IF EXISTS events; 
    CREATE TABLE IF NOT EXISTS events (
      id SERIAL PRIMARY KEY,
      event_name VARCHAR(255),
      location VARCHAR(255),
      event_time TIMESTAMP,
      price DECIMAL(10, 2),
      capacity INTEGER
    );
  `;

  await pool.query(createTableQuery);
}

async function seedEvents() {
  try {
    await createEventsTable();
    
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
        event.capacity
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

seedEvents();
