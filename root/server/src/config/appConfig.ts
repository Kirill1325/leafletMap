import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { userRouter } from "../routes/user.routes";
import bodyParser from 'body-parser';

export const configure = (app: Application) => {

    app
        // .use(bodyParser.urlencoded({ extended: false }))
        // .use(express.urlencoded({ extended: false }))
        .use(cors<Request>()) // must be first
        .use(express.json())
        .use('/api', userRouter)
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