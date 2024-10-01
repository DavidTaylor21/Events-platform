const pool = require("../db/connection");

export const insertNewUser = (user: any) => {
  const { name, email, phone_number, staff } = user;

  const queryStr = `INSERT INTO users (name, email, phone_number, staff)
        VALUES ($1, $2, $3, $4)`;

  const values = [name, email, phone_number, staff];

  return pool.query(queryStr, values).then((result: any) => {
    return result;
  });
};
