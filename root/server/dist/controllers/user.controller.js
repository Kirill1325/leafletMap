"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("../service/user.service");
class UserController {
    async registration(req, res) {
        try {
            const { username, email, password } = req.body;
            const userData = await user_service_1.userService.registration(username, email, password);
            console.log('userData', userData);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json(userData);
        }
        catch (e) {
            console.log(e);
        }
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const userData = await user_service_1.userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json(userData);
        }
        catch (e) {
            console.log(e);
        }
    }
    async logout(req, res) {
        try {
            const { refreshToken } = req.cookies;
            console.log(refreshToken);
            await user_service_1.userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.sendStatus(200);
        }
        catch (e) {
            console.log(e);
        }
    }
    async activate(req, res) {
        try {
        }
        catch (e) {
            console.log(e);
        }
    }
    async refresh(req, res) {
        try {
            const { refreshToken } = req.cookies;
            const userData = await user_service_1.userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json(userData);
        }
        catch (e) {
            console.log(e);
        }
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map