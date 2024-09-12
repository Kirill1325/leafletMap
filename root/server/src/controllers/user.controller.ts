import { Request, Response } from 'express';


class UserController {

    init(req: Request, res: Response,) {
        // res.setHeader('upgrade', 'websocket');
        // res.setHeader('connection', 'Upgrade');
        // res.writeHead(101)
        res.send('working');
    }

    async createUser(req: Request, res: Response) {
        const { username } = req.body
        res.json(req.body)
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