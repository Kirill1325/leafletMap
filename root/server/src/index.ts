import 'dotenv/config'
import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import http from 'http';
import WebSocket, { WebSocketServer } from 'ws'

export default function configure(app: Application) {

    app
        .get('/', (req, res, next) => {
            // res.sendFile(resolve(__dirname, '../index.html'));
            res.send('working...');
            res.writeHead(101, { 'upgrade': 'websocket', 'connection': 'Upgrade' });
        })
        .use(express.static('public'))
        // .use(json())
        // .use('/api', api())
        .use('/error', (req, res, next) => {
            next(new Error('Other Error'));
        })
        .use((req, res, next) => {
            next(new Error('Not Found'));
        })
        .use((error: Error, req: Request, res: Response, next: NextFunction) => {
            switch (error.message) {
                case 'Not Found':
                    return;
            }

        })

}

const PORT = process.env.PORT || 3000

const app = express()

configure(app);

app.use(cors<Request>());

const server = http.createServer(app);
server.on('request', app)

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


