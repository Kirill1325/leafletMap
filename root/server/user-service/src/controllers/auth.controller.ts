import { Request, Response } from 'express';
import { authService } from '../service/auth.service';


export class AuthController {

    async registration(req: Request, res: Response) {
        try {
            const { username, email, password } = req.body
            const userData = await authService.registration(username, email, password)
            // console.log('userData', userData)
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            

            return res.json(userData)
        } catch (e) {
            console.log(e)
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body
            const userData = await authService.login(email, password)

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
            await authService.logout(refreshToken)
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
            const userData = await authService.refresh(refreshToken)

            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })

            return res.json(userData)
        } catch (e) {
            console.log(e)
        }
    }

    async getUsers(req: Request, res: Response) {
        try {
            const users = await authService.getUsers()
            return res.json(users)
        } catch (e) {
            console.log(e)
        }
    }

    async connect(req: Request, res: Response) {
        res.setHeader('upgrade', 'websocket');
        res.setHeader('connection', 'Upgrade');
        res.send(req.headers)

    }

}
