import 'dotenv/config'
import { configure } from './config/appConfig'
import express from 'express';
import http from 'http'
import WebSocket, { WebSocketServer } from 'ws'

const PORT = process.env.PORT || 3000

const app = express()

configure(app)

const server = http.createServer(app);

console.log(`Attempting to run server on port ${PORT}`);

server.listen(PORT, () => console.log(`App listening on port ${PORT}`))

const webSocketServer = new WebSocketServer({ server });

webSocketServer.on('connection', function connection(ws) {

    ws.on('error', console.error)

    ws.on('message', function message(data, isBinary) {
        webSocketServer.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data, { binary: isBinary });
            }
        });
    });
})