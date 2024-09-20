"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("../service/auth.service");
class AuthController {
    async registration(req, res) {
        try {
            const { username, email, password } = req.body;
            const userData = await auth_service_1.authService.registration(username, email, password);
            // console.log('userData', userData)
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            // await this.redirect(req, res)
            return res.json(userData);
        }
        catch (e) {
            console.log(e);
        }
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const userData = await auth_service_1.authService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            // await this.redirect(req, res)
            // res.redirect('http://localhost:8080/api/connect/')
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
            await auth_service_1.authService.logout(refreshToken);
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
            const userData = await auth_service_1.authService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json(userData);
        }
        catch (e) {
            console.log(e);
        }
    }
    async getUsers(req, res) {
        try {
            const users = await auth_service_1.authService.getUsers();
            return res.json(users);
        }
        catch (e) {
            console.log(e);
        }
    }
    async connect(req, res) {
        res.setHeader('upgrade', 'websocket');
        res.setHeader('connection', 'Upgrade');
        res.send(req.headers);
    }
    async redirect(req, res) {
        res.redirect('http://localhost:8080/api/connect/');
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map