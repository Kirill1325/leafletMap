import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

export const authRouter = Router();

const authController = new AuthController();

authRouter.post('/registration', authController.registration)
authRouter.post('/login', authController.login)
authRouter.post('/logout', authController.logout)
authRouter.get('/activate/:link', authController.activate)
authRouter.get('/refresh', authController.refresh)
authRouter.get('/users', authController.getUsers)
