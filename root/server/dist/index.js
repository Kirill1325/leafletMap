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
exports.default = configure;
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const ws_1 = __importStar(require("ws"));
function configure(app) {
    app
        .get('/', (req, res, next) => {
        // res.sendFile(resolve(__dirname, '../index.html'));
        res.send('working...');
        res.writeHead(101, { 'upgrade': 'websocket', 'connection': 'Upgrade' });
    })
        .use(express_1.default.static('public'))
        // .use(json())
        // .use('/api', api())
        .use('/error', (req, res, next) => {
        next(new Error('Other Error'));
    })
        .use((req, res, next) => {
        next(new Error('Not Found'));
    })
        .use((error, req, res, next) => {
        switch (error.message) {
            case 'Not Found':
                return;
        }
    });
}
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
configure(app);
app.use((0, cors_1.default)());
// app.get('/', (req, res) => {
//     res.send('working!')
//     res.writeHead(101, {
//         'upgrade': 'websocket',
//         'connection': 'Upgrade'
//     })
// })
const server = http_1.default.createServer(app);
server.on('request', app);
console.log(`Attempting to run server on port ${PORT}`);
server.listen(PORT, () => console.log(`App listening on port ${PORT}`));
const webSocketServer = new ws_1.WebSocketServer({ server });
webSocketServer.on('connection', function connection(ws) {
    // ws.send(JSON.stringify({ username: 'hello', message: 'hello' }));
    ws.on('error', console.error);
    ws.on('message', function message(data, isBinary) {
        webSocketServer.clients.forEach(function each(client) {
            if (client.readyState === ws_1.default.OPEN) {
                client.send(data, { binary: isBinary });
            }
        });
    });
});
//# sourceMappingURL=index.js.map