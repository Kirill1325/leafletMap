"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
exports.userRouter = (0, express_1.Router)();
const userController = new user_controller_1.UserController();
exports.userRouter.post('/registration', userController.registration);
exports.userRouter.post('/login', userController.login);
exports.userRouter.post('/logout', userController.logout);
exports.userRouter.get('/activate/:link', userController.activate);
exports.userRouter.get('/refresh', userController.refresh);
//# sourceMappingURL=user.routes.js.map