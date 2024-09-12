"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configure = void 0;
const express_1 = __importDefault(require("express"));
const user_routes_1 = require("../routes/user.routes");
const configure = (app) => {
    app
        // .use(bodyParser.urlencoded({ extended: false }))
        // .use(express.urlencoded({ extended: false }))
        // .use(cors<Request>()) // must be first
        // .use(bodyParser.json())
        .use(express_1.default.json())
        .use('/api', user_routes_1.userRouter);
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
};
exports.configure = configure;
//# sourceMappingURL=appConfig.js.map