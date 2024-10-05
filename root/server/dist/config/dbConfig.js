"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTables = exports.pool = void 0;
const pg_1 = __importDefault(require("pg"));
const { Pool } = pg_1.default;
exports.pool = new Pool({
    connectionString: process.env.DB_URL
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
      password VARCHAR(255)
    );`;
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
    user_positions(
      id SERIAL PRIMARY KEY,
      user_id integer REFERENCES person (id),
      lat real,
      lng real
    );`;
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