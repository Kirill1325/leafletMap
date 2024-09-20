"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
exports.authRouter = (0, express_1.Router)();
const authController = new auth_controller_1.AuthController();
exports.authRouter.post('/registration', authController.registration);
exports.authRouter.post('/login', authController.login);
exports.authRouter.post('/logout', authController.logout);
exports.authRouter.get('/activate/:link', authController.activate);
exports.authRouter.get('/refresh', authController.refresh);
exports.authRouter.get('/users', authController.getUsers);
//# sourceMappingURL=auth.routes.js.map