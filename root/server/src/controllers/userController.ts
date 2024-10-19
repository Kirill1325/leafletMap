import { Request, Response, NextFunction } from "express";
import { userService } from "../service/userService";

export class UserController {

    async updateProfilePic(req: Request, res: Response, next: NextFunction) {
        try {
            const profilePic = req.file
        } catch (e) {
            next(e)
        }

    }

    async getUsers(req: Request, res: Response) {
        try {
            const users = await userService.getUsers()
            return res.json(users)
        } catch (e) {
            res.json(e)
        }
    }

    async getPossibleFriends(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.params
            const possibleFriends = await userService.getPossibleFriends(parseInt(userId))
            return res.json(possibleFriends)
        } catch (e) {
            next(e)
        }
    }

    async sendFriendsRequest(req: Request, res: Response, next: NextFunction) {
        try {
            const { senderId, receiverId } = req.body

            await userService.sendFriendsRequest(senderId, receiverId)

            res.sendStatus(200)

        } catch (e) {
            next(e)
        }
    }

    async getFriends(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.params
            const friends = await userService.getFriends(parseInt(userId))
            return res.json(friends)
        } catch (e) {
            next(e)
        }
    }

    async deleteFriendship(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId, friendId } = req.params
            await userService.deleteFriendship(parseInt(userId), parseInt(friendId))
            return res.sendStatus(200)
        } catch (e) {
            next(e)
        }
    }
}