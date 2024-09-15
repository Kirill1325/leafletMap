"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const dbConfig_1 = require("../config/dbConfig");
const user_service_1 = require("../service/user.service");
class UserController {
    async createUser(req, res) {
        const { username } = req.body;
        const user = await dbConfig_1.pool.query('INSERT INTO person (username) VALUES ($1) RETURNING *', [username]);
        res.json(user.rows);
    }
    async getUsers(req, res) {
        const users = await dbConfig_1.pool.query('SELECT * FROM person');
        res.json(users.rows);
    }
    async getUserById(req, res) {
        const id = req.params.id;
        const user = await dbConfig_1.pool.query('SELECT * FROM person WHERE id = $1', [id]);
        res.json(user.rows);
    }
    async updateUser(req, res) {
        const { id, username } = req.body;
        await dbConfig_1.pool.query('UPDATE person SET username = $1 WHERE id = $2', [username, id]);
    }
    async deleteUser(req, res) {
        const id = req.params.id;
        await dbConfig_1.pool.query('DELETE FROM person WHERE id = $1', [id]);
    }
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
        }
        catch (e) {
        }
    }
    async logout(req, res) {
        try {
        }
        catch (e) {
        }
    }
    async activate(req, res) {
        try {
        }
        catch (e) {
        }
    }
    async refresh(req, res) {
        try {
        }
        catch (e) {
        }
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map