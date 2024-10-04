import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { authRouter } from "../routes/authRoutes";
import { userRouter } from '../routes/userRoutes';
import { errorMiddleware } from '../middleware/errorMiddleware';

export const configure = (app: Application) => {

    app
        .use(cookieParser())
        .use(cors<Request>({ credentials: true, origin: process.env.CLIENT_URL }))
        .use(express.json())
        .use('/', authRouter)
        .use(errorMiddleware)
        .get('/', (req, res: Response, next) => {
            res.setHeader('upgrade', 'websocket')
            res.setHeader('connection', 'Upgrade')
            res.send('working');
        })

}