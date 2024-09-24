import 'dotenv/config'
import express, { Application, Request, Response, NextFunction, Router } from 'express';
import http from 'http';
import { configure } from './config/appConfig';

const PORT = process.env.PORT || 3000

const app = express()

configure(app);

const server = http.createServer(app);

console.log(`Attempting to run server on port ${PORT}`);

server.listen(PORT, () => console.log(`App listening on port ${PORT}`))




