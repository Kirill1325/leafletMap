"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// require('dotenv').config({path:'../.env'})
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const appConfig_1 = require("./config/appConfig");
const dbConfig_1 = require("./config/dbConfig");
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
(0, appConfig_1.configure)(app);
(0, dbConfig_1.createTables)();
const server = http_1.default.createServer(app);
console.log(`Attempting to run server on port ${PORT}`);
server.listen(PORT, () => console.log(`App listening on port ${PORT}`));
//# sourceMappingURL=index.js.map