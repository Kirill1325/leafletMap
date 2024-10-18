"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const userService_1 = require("../service/userService");
class UserController {
    async updateProfilePic(req, res, next) {
        try {
            const profilePic = req.file;
        }
        catch (e) {
            next(e);
        }
    }
    async getUsers(req, res) {
        try {
            const users = await userService_1.userService.getUsers();
            return res.json(users);
        }
        catch (e) {
            res.json(e);
        }
    }
    async sendFriendsRequest(req, res, next) {
        try {
            const { senderId, receiverId } = req.body;
            await userService_1.userService.sendFriendsRequest(senderId, receiverId);
            res.sendStatus(200);
        }
        catch (e) {
            next(e);
        }
    }
    async getFriends(req, res, next) {
        try {
            const { userId } = req.params;
            const friends = await userService_1.userService.getFriends(parseInt(userId));
            return res.json(friends);
        }
        catch (e) {
            next(e);
        }
    }
}
exports.UserController = UserController;
//# sourceMappingURL=userController.js.map