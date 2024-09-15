import { Request, Response } from 'express';
import { pool } from '../config/dbConfig';
import { userService } from '../service/user.service';

export class UserController {

    async registration(req: Request, res: Response) {
        try {
            const { username, email, password } = req.body
            const userData = await userService.registration(username, email, password)
            console.log('userData', userData)
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })

            return res.json(userData)
        } catch (e) {
            console.log(e)
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body
            const userData = await userService.login(email, password)

            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })

            return res.json(userData)
        } catch (e) {
            console.log(e)
        }
    }

    async logout(req: Request, res: Response) {
        try {
            const { refreshToken } = req.cookies
            console.log(refreshToken)
            await userService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.sendStatus(200)
        } catch (e) {
            console.log(e)
        }
    }

    async activate(req: Request, res: Response) {
        try {

        } catch (e) {
            console.log(e)
        }
    }

    async refresh(req: Request, res: Response) {
        try {
            const { refreshToken } = req.cookies
            const userData = await userService.refresh(refreshToken)

            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })

            return res.json(userData)
        } catch (e) {
            console.log(e)
        }
    }
}
