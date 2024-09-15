import { Router } from "express";
import { UserController } from "../controllers/user.controller";

export const userRouter = Router();

const userController = new UserController()

userRouter.post('/registration', userController.registration)
userRouter.post('/login', userController.login)
userRouter.post('/logout', userController.logout)
userRouter.get('/activate/:link', userController.activate)
userRouter.get('/refresh', userController.refresh)
userRouter.get('/users', userController.getUsers)