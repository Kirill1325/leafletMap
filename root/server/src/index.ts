import 'dotenv/config'
import express from 'express';
import http from 'http';
import { configure } from './config/appConfig';
import { createTables } from './config/dbConfig';
import { positionsService } from './service/positionsService';
import { Server, Socket } from 'socket.io';

const PORT = process.env.PORT || 3000

const app = express()

configure(app)

createTables()

const server = http.createServer(app)

console.log(`Attempting to run server on port ${PORT}`)

server.listen(PORT, () => console.log(`App listening on port ${PORT}`))

const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL,
    }
});


io.on('connection', (socket: Socket) => {

    console.log('a user connected');

    // socket.on('join room', async (chatId: string, userId: number) => {
    //     await socket.join(chatId);
    //     console.log(`user ${userId} joined room ${chatId}`)
    // });
    // socket.on('leave room', async (chatId: string, userId: number) => {
    //     await socket.leave(chatId);
    //     console.log(`user ${userId} left room ${chatId}`)
    // });

    socket.on('send position', async (userId: number, lat: string, lng: string) => {
        console.log(userId, lat, lng)
        await positionsService.addPosition(userId, lat, lng)
    })

    socket.on('get positions', async (userId: number) => {

        const positions = await positionsService.getPositions(userId)
        console.log('positions ', positions)

        socket.emit('receive positions', positions)
    })

    socket.on('disconnect', () => console.log('user disconnected'));

})