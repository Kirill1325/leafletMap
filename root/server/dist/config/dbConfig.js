"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTables = exports.pool = void 0;
require("dotenv/config");
const pg_1 = __importDefault(require("pg"));
const { Pool } = pg_1.default;
// const connectionString = 'postgresql://leaflet_sss5_user:99RjsTYVk4ON1ZRGO6FACC6kTmBZb1dO@dpg-crpfa9jtq21c7399q80g-a.oregon-postgres.render.com:5432/leaflet_sss5?ssl=true'
exports.pool = new Pool({
    connectionString: process.env.DB_URL
    // host: process.env.DB_HOST,
    // user: process.env.DB_USER,
    // password: process.env.DB_PASSWORD,
    // database: process.env.DB_NAME,
    // port: Number(process.env.DB_PORT)
});
exports.pool.on("connect", () => {
    console.log("connected to the Database");
});
const createTables = () => {
    const personTable = `CREATE TABLE IF NOT EXISTS
    person(
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE,
      email VARCHAR(255) UNIQUE,
      password VARCHAR(255),
      created_at integer,
      is_activated BOOLEAN,
      activation_link VARCHAR(255)
    );`;
    // pool
    //   .query('CREATE DATABASE leaflet;')
    //   .then((res) => {
    //     console.log('res', res);
    //   })
    //   .catch((err) => {
    //     console.log('err', err);
    //   });
    exports.pool
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
    exports.pool
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
    exports.pool
        .query(positionsTable)
        .then((res) => {
        console.log(res);
    })
        .catch((err) => {
        console.log(err);
    });
};
exports.createTables = createTables;
//# sourceMappingURL=dbConfig.js.map