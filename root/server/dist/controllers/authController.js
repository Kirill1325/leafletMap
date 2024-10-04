"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const authService_1 = require("../service/authService");
class AuthController {
    async registration(req, res, next) {
        try {
            const { username, email, password } = req.body;
            const userData = await authService_1.authService.registration(username, email, password);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true, sameSite: 'none' });
            res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL);
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
            res.setHeader('Access-Control-Allow-Credentials', 'true');
            return res.json(userData);
        }
        catch (e) {
            next(e);
        }
    }
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const userData = await authService_1.authService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true, sameSite: 'none' });
            res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL);
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
            res.setHeader('Access-Control-Allow-Credentials', 'true');
            return res.json(userData);
        }
        catch (e) {
            next(e);
        }
    }
    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            // console.log(refreshToken)
            await authService_1.authService.logout(refreshToken);
            res.clearCookie('refreshToken');
            res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL);
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
            res.setHeader('Access-Control-Allow-Credentials', 'true');
            return res.sendStatus(200);
        }
        catch (e) {
            next(e);
        }
    }
    async activate(req, res, next) {
        try {
        }
        catch (e) {
            next(e);
        }
    }
    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const userData = await authService_1.authService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true, sameSite: 'none' });
            res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL);
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
            res.setHeader('Access-Control-Allow-Credentials', 'true');
            return res.json(userData);
        }
        catch (e) {
            next(e);
        }
    }
    async getUsers(req, res) {
        try {
            const users = await authService_1.authService.getUsers();
            return res.json(users);
        }
        catch (e) {
            res.json(e);
        }
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=authController.js.map