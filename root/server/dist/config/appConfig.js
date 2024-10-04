"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configure = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const authRoutes_1 = require("../routes/authRoutes");
const errorMiddleware_1 = require("../middleware/errorMiddleware");
const positionsRoutes_1 = require("../routes/positionsRoutes");
const configure = (app) => {
    app
        .use((0, cookie_parser_1.default)())
        .use((0, cors_1.default)({ credentials: true, origin: process.env.CLIENT_URL }))
        .use(express_1.default.json())
        .use('/auth', authRoutes_1.authRouter)
        .use('/positions', positionsRoutes_1.positionsRouter)
        .use(errorMiddleware_1.errorMiddleware)
        .get('/', (req, res, next) => {
        // res.setHeader('upgrade', 'websocket')
        // res.setHeader('connection', 'Upgrade')
        res.send('working');
    });
};
exports.configure = configure;
//# sourceMappingURL=appConfig.js.map