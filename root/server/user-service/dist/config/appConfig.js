"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configure = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_routes_1 = require("../routes/auth.routes");
const user_routes_1 = require("../routes/user.routes");
const configure = (app) => {
    app
        .use((0, cors_1.default)()) // must be first
        .use((0, cookie_parser_1.default)())
        .use(express_1.default.json())
        .use('/auth', auth_routes_1.authRouter)
        .use('/api', user_routes_1.userRouter)
        .get('/', (req, res, next) => {
        res.send('working');
    });
};
exports.configure = configure;
//# sourceMappingURL=appConfig.js.map