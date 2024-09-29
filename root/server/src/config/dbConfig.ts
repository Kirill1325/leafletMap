import 'dotenv/config'
import pg from 'pg'

const { Pool } = pg

export const pool = new Pool({
  connectionString: process.env.DB_URL
  // host: process.env.DB_HOST,
  // user: process.env.DB_USER,
  // password: process.env.DB_PASSWORD,
  // database: process.env.DB_NAME,
  // port: Number(process.env.DB_PORT)
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

  // pool
  //   .query('CREATE DATABASE leaflet;')
  //   .then((res) => {
  //     console.log('res', res);
  //   })
  //   .catch((err) => {
  //     console.log('err', err);
  //   });

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
    positions(
      user_id integer,
      lat integer,
      lng integer
    )`;

  pool
    .query(positionsTable)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);

    });

};
