import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { authRouter } from "../routes/auth.routes";
import { userRouter } from '../routes/user.routes';

export const configure = (app: Application) => {

    app
        .use(cors<Request>()) // must be first
        .use(cookieParser())
        .use(express.json())
        .use('/auth', authRouter)
        .use('/api', userRouter)
        .get('/', (req, res: Response, next) => {
            res.send('working');
        })

}