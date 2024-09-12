"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
exports.userRouter = (0, express_1.Router)();
exports.userRouter.get('/', user_controller_1.userController.init);
exports.userRouter.post('/user', user_controller_1.userController.createUser);
// userRouter.get('/user:id', userController.getUserById)
// userRouter.get('/user', userController.getUsers)
// userRouter.put('/user', userController.updateUser)
// userRouter.delete('/user:id', userController.deleteUser)
//# sourceMappingURL=user.routes.js.map