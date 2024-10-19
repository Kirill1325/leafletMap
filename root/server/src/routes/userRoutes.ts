import { Router } from "express";
import { UserController } from "../controllers/userController";

export const userRouter = Router()

const userController = new UserController()

userRouter.get('/', userController.getUsers)
userRouter.get('/:userId/friends', userController.getFriends)
userRouter.get('/:userId/possibleFriends', userController.getPossibleFriends)
userRouter.patch('/updateProfilePic', userController.updateProfilePic)
userRouter.post('/sendFriendsRequest', userController.sendFriendsRequest)
userRouter.delete('/:userId/:friendId/deleteFriendship', userController.deleteFriendship)