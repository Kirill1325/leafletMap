"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const appConfig_1 = require("./config/appConfig");
const dbConfig_1 = require("./config/dbConfig");
const ws_1 = __importStar(require("ws"));
const positionsService_1 = require("./service/positionsService");
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
(0, appConfig_1.configure)(app);
(0, dbConfig_1.createTables)();
const server = http_1.default.createServer(app);
console.log(`Attempting to run server on port ${PORT}`);
server.listen(PORT, () => console.log(`App listening on port ${PORT}`));
const webSocketServer = new ws_1.WebSocketServer({ server });
webSocketServer.on('connection', function connection(ws) {
    // TODO: try A client WebSocket broadcasting to every other connected WebSocket clients, excluding itself
    ws.on('error', console.error);
    ws.on('message', function message(data, isBinary) {
        webSocketServer.clients.forEach(function each(client) {
            if (client.readyState === ws_1.default.OPEN) {
                const { user_id, lat, lng } = JSON.parse(data.toString());
                console.log(JSON.parse(data.toString()));
                positionsService_1.positionsService.addPosition(user_id, lat, lng);
                client.send(data, { binary: isBinary });
            }
        });
    });
});
//# sourceMappingURL=index.js.map