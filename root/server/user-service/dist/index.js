"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const appConfig_1 = require("./config/appConfig");
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
(0, appConfig_1.configure)(app);
const server = http_1.default.createServer(app);
console.log(`Attempting to run server on port ${PORT}`);
server.listen(PORT, () => console.log(`App listening on port ${PORT}`));
// const webSocketServer = new WebSocketServer({ server });
// webSocketServer.on('connection', function connection(ws) {
//     ws.on('error', console.error)
//     ws.on('message', function message(data, isBinary) {
//         webSocketServer.clients.forEach(function each(client) {
//             if (client.readyState === WebSocket.OPEN) {
//                 client.send(data, { binary: isBinary });
//             }
//         });
//     });
// })
//# sourceMappingURL=index.js.map