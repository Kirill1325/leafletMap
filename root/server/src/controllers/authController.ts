import { Request, Response, NextFunction } from 'express';
import { authService } from '../service/authService';

export class AuthController {

    async registration(req: Request, res: Response, next: NextFunction) {
        try {
            const { username, email, password } = req.body

            const userData = await authService.registration(username, email, password)

            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true, sameSite: 'none' })
            
            res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL);
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
            res.setHeader('Access-Control-Allow-Credentials', 'true');

            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body
            const userData = await authService.login(email, password)

            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true, sameSite: 'none' })

            res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL);
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
            res.setHeader('Access-Control-Allow-Credentials', 'true');

            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {

            const { refreshToken } = req.cookies
            // console.log(refreshToken)
            await authService.logout(refreshToken)
            res.clearCookie('refreshToken')

            res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL);
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
            res.setHeader('Access-Control-Allow-Credentials', 'true');
            return res.sendStatus(200)
        } catch (e) {
            next(e)
        }
    }

    async activate(req: Request, res: Response, next: NextFunction) {
        try {

        } catch (e) {
            next(e)
        }
    }

    async refresh(req: Request, res: Response, next: NextFunction) {
        try {

            const { refreshToken } = req.cookies
            const userData = await authService.refresh(refreshToken)

            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true, sameSite: 'none' })

            res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL);
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
            res.setHeader('Access-Control-Allow-Credentials', 'true');
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

   

}
