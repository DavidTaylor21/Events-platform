const pool = require("../db/connection");

export const insertNewEvent = (body: {
  event_name: String;
  location: String;
  event_time: String;
  price: Number;
  capacity: Number;
}) => {
  const { event_name, location, event_time, price, capacity } = body;

  const queryStr = `INSERT INTO events (event_name, location, event_time, price, capacity) 
    VALUES ($1, $2, $3, $4, $5);`;

  const values = [event_name, location, event_time, price, capacity];

  return pool.query(queryStr, values).then((result: any) => {
    return result;
  });
};

export const selectAllEvents = () => {
  return pool.query("SELECT * FROM events;").then((result: { rows: [] }) => {
    return result.rows;
  });
};

export const selectEventById = (id: Number) => {
  return pool.query("SELECT * FROM events WHERE id = $1", [id]).then((result: { rows: [] })=>{
    return result.rows
  })
}

export const insertUserToEvent= (user_id: Number, event_id: Number) => {
  const queryStr = `INSERT INTO user_events (user_id, event_id) VALUES ($1, $2) 
   ON CONFLICT (user_id, event_id) DO NOTHING;`;

    const values = [user_id, event_id];

    return pool.query(queryStr, values).then((result:any)=>{
      return result
    })
}
