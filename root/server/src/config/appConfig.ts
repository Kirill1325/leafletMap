import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { userRouter } from "../routes/user.routes";
// import { authRouter } from '../routes/auth.routes';

export const configure = (app: Application) => {

    app
        // .use(bodyParser.urlencoded({ extended: false }))
        // .use(express.urlencoded({ extended: false }))
        .use(cors<Request>()) // must be first
        .use(cookieParser())
        .use(express.json())
        .use('/api', userRouter)
        // .use('/auth', authRouter)
        // .get('/', (req, res: Response, next) => {
        //     // res.setHeader('upgrade', 'websocket');
        //     // res.setHeader('connection', 'Upgrade');
        //     res.send('working');
        //     // res.send(req.headers)
        // })
        
    // .use('/error', (req, res, next) => {
    //     next(new Error('Other Error'));
    // })
    // .use((req, res, next) => {
    //     next(new Error('Not Found'));
    // })
    // .use((error: Error, req: Request, res: Response, next: NextFunction) => {
    //     switch (error.message) {
    //         case 'Not Found':
    //             return;
    //     }
    // })
}