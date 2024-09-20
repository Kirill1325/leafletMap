import { Request, Response } from 'express';
import { userService } from '../service/user.service';

export class UserController {

    async getUserById(req: Request, res: Response) {
        try {
            const { id } = req.params
            const user = await userService.getUserById(id)
            

            return res.json(user)
        } catch (e) {
            console.log(e)
        }
    }

}