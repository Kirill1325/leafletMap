"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const appConfig_1 = require("./config/appConfig");
const dbConfig_1 = require("./config/dbConfig");
const positionsService_1 = require("./service/positionsService");
const socket_io_1 = require("socket.io");
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
(0, appConfig_1.configure)(app);
(0, dbConfig_1.createTables)();
const server = http_1.default.createServer(app);
console.log(`Attempting to run server on port ${PORT}`);
server.listen(PORT, () => console.log(`App listening on port ${PORT}`));
const io = new socket_io_1.Server(server, {
    cors: {
        origin: process.env.CLIENT_URL,
    }
});
io.on('connection', (socket) => {
    console.log('a user connected');
    // socket.on('join room', async (chatId: string, userId: number) => {
    //     await socket.join(chatId);
    //     console.log(`user ${userId} joined room ${chatId}`)
    // });
    // socket.on('leave room', async (chatId: string, userId: number) => {
    //     await socket.leave(chatId);
    //     console.log(`user ${userId} left room ${chatId}`)
    // });
    socket.on('send position', async (userId, lat, lng) => {
        console.log(userId, lat, lng);
        await positionsService_1.positionsService.addPosition(userId, lat, lng);
    });
    socket.on('get positions', async () => {
        const positions = await positionsService_1.positionsService.getPositions();
        console.log('positions ', positions);
        socket.emit('receive positions', positions);
    });
    socket.on('disconnect', () => console.log('user disconnected'));
});
//# sourceMappingURL=index.js.map