import { Router } from "express";
import { userController } from "../controllers/user.controller";

export const userRouter = Router();

userRouter.post('/user', userController.createUser)
// userRouter.get('/user:id', userController.getUserById)
// userRouter.get('/user', userController.getUsers)
// userRouter.put('/user', userController.updateUser)
// userRouter.delete('/user:id', userController.deleteUser)