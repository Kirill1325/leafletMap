import { Request, Response } from 'express';
import { pool } from '../config/dbConfig';
import { userService } from '../service/user.service';

export class UserController {

    async createUser(req: Request, res: Response) {
        const { username } = req.body
        const user = await pool.query('INSERT INTO person (username) VALUES ($1) RETURNING *', [username])
        res.json(user.rows)
    }

    async getUsers(req: Request, res: Response,) {
        const users = await pool.query('SELECT * FROM person')
        res.json(users.rows)
    }

    async getUserById(req: Request, res: Response,) {
        const id = req.params.id
        const user = await pool.query('SELECT * FROM person WHERE id = $1', [id])
        res.json(user.rows)
    }

    async updateUser(req: Request, res: Response,) {
        const { id, username } = req.body
        await pool.query('UPDATE person SET username = $1 WHERE id = $2', [username, id])
    }

    async deleteUser(req: Request, res: Response,) {
        const id = req.params.id
        await pool.query('DELETE FROM person WHERE id = $1', [id])
    }

    async registration(req: Request, res: Response) {
        try {
            const {username, email, password} = req.body
            const userData = await userService.registration(username, email, password)
            console.log('userData', userData)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

            return res.json(userData)
        } catch (e) {
            console.log(e)
        }
    }

    async login(req: Request, res: Response) {
        try {

        } catch (e) {

        }
    }

    async logout(req: Request, res: Response) {
        try {

        } catch (e) {

        }
    }

    async activate(req: Request, res: Response) {
        try {

        } catch (e) {

        }
    }

    async refresh(req: Request, res: Response) {
        try {

        } catch (e) {

        }
    }
}
