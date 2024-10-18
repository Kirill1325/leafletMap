"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
exports.authRouter = (0, express_1.Router)();
const authController = new authController_1.AuthController();
exports.authRouter.post('/registration', authController.registration);
exports.authRouter.post('/login', authController.login);
exports.authRouter.post('/logout', authController.logout);
exports.authRouter.get('/activate/:link', authController.activate);
exports.authRouter.post('/refresh', authController.refresh);
//# sourceMappingURL=authRoutes.js.map