import 'dotenv/config'
import express, { Application, Request, Response, NextFunction, Router } from 'express';
import http from 'http';
import cors from 'cors';
import WebSocket, { WebSocketServer } from 'ws'
import { configure } from './config/appConfig';
import { userRouter } from './routes/user.routes';

const PORT = process.env.PORT || 3000

const app = express()

configure(app);

const server = http.createServer(app);

app.get('/', (req, res: Response, next) => {
    // res.setHeader('upgrade', 'websocket');
    // res.setHeader('connection', 'Upgrade');
    res.send('working');
    // res.send(req.headers)
})

console.log(`Attempting to run server on port ${PORT}`);

server.listen(PORT, () => console.log(`App listening on port ${PORT}`))

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


