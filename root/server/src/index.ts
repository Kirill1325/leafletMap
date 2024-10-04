import 'dotenv/config'
import express from 'express';
import http from 'http';
import { configure } from './config/appConfig';
import { createTables } from './config/dbConfig';
import WebSocket, { WebSocketServer } from 'ws';
import { positionsService } from './service/positionsService';

const PORT = process.env.PORT || 3000

const app = express()

configure(app)

createTables()

const server = http.createServer(app)

console.log(`Attempting to run server on port ${PORT}`)

server.listen(PORT, () => console.log(`App listening on port ${PORT}`))

const webSocketServer = new WebSocketServer({ server });

webSocketServer.on('connection', function connection(ws) {

    ws.on('error', console.error)

    ws.on('message', function message(data, isBinary) {
        webSocketServer.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                const { user_id, lat, lng } = JSON.parse(data.toString())
                console.log(JSON.parse(data.toString()))
                positionsService.addPosition(user_id, lat, lng)
                client.send(data, { binary: isBinary });
            }
        });
    });
})