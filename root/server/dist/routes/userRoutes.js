"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
exports.userRouter = (0, express_1.Router)();
const userController = new userController_1.UserController();
exports.userRouter.get('/users/:id', userController.getUserById);
//# sourceMappingURL=userRoutes.js.map