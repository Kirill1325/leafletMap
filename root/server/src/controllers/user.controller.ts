import { Request, Response } from 'express';

class UserController {

    async createUser(req: Request, res: Response) {
        // const { username } = req.body
        // res.send(req.body)
        console.log(req.body)
        console.log(req.headers)
    }

    // async getUsers(req: Request, res: Response,) {
    //     res.send('working...');
    // }

    // async getUserById(req: Request, res: Response,) {
    //     res.send('working...');
    // }

    // async updateUser(req: Request, res: Response,) {
    //     res.send('working...');
    // }

    // async deleteUser(req: Request, res: Response,) {
    //     res.send('working...');
    // }
}

export const userController = new UserController()