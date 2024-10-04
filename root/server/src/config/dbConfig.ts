import pg from 'pg'

const { Pool } = pg

export const pool = new Pool({
  connectionString: process.env.DB_URL
})

pool.on("connect", () => {
  console.log("connected to the Database");

});

export const createTables = () => {

  const personTable = `CREATE TABLE IF NOT EXISTS
    person(
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE,
      email VARCHAR(255) UNIQUE,
      password VARCHAR(255),
      created_at integer,
      is_activated BOOLEAN,
      activation_link VARCHAR(255)
    );`

  pool
    .query(personTable)
    .then((res) => {
      console.log('res', res);
    })
    .catch((err) => {
      console.log('err', err);
    });


  const tokenTable = `CREATE TABLE IF NOT EXISTS
    token(
      token_id SERIAL PRIMARY KEY,
      user_id integer REFERENCES person (id),
      refresh_token VARCHAR(255)
    )`;

  pool
    .query(tokenTable)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);

    });
    

  const positionsTable = `CREATE TABLE IF NOT EXISTS
    user_positions(
      id SERIAL PRIMARY KEY,
      user_id integer REFERENCES person (id),
      lat VARCHAR(255),
      lng VARCHAR(255)
    );`

  pool
    .query(positionsTable)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);

    });

};
