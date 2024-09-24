import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors'
import { positionRouter } from '../routes/positionRoutes';

export const configure = (app: Application) => {

    app
        .use(cors<Request>()) 
        .use(express.json())
        .use('/api', positionRouter)
        .get('/', (req, res: Response, next) => {
            res.send('working');
        })

}