import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { authRouter } from "../routes/authRoutes";
import { errorMiddleware } from '../middleware/errorMiddleware';
import { positionsRouter } from '../routes/positionsRoutes';

export const configure = (app: Application) => {

    app
        .use(cookieParser())
        .use(cors<Request>({ credentials: true, origin: process.env.CLIENT_URL }))
        .use(express.json())
        .use('/auth', authRouter)
        .use('/positions', positionsRouter)
        .use(errorMiddleware)
        .get('/', (req, res: Response, next) => {
            res.send('working');
        })

}