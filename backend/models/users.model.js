import pool from "../db/connection.js";

export const insertNewUser = (user) => {
  const { name, email, phone_number, staff } = user;

  const queryStr = `INSERT INTO users (name, email, phone_number, staff)
        VALUES ($1, $2, $3, $4)`;

  const values = [name, email, phone_number, staff];

  return pool.query(queryStr, values).then((result) => {
    return result;
  });
};
