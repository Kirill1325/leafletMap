"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const dbConfig_1 = require("../config/dbConfig");
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_dto_1 = require("../dtos/user.dto");
const token_service_1 = require("./token.service");
// TODO: add injection defence
class UserService {
    async registration(username, email, password) {
        const candidate = await dbConfig_1.pool.query('SELECT * FROM person WHERE email = $1', [email]);
        if (candidate.rows.length > 0) {
            throw new Error('User already exists');
        }
        const hashPassword = await bcrypt_1.default.hash(password, 12);
        // TODO: add mail activation link
        const user = await dbConfig_1.pool.query('INSERT INTO person (username, email, password, created_at, is_activated, activation_link) VALUES ($1, $2, $3, $4, $5, $6 ) RETURNING *', [username, email, hashPassword, 123, true, 'link']);
        const userDto = new user_dto_1.UserDto(user.rows[0]);
        const tokens = await token_service_1.tokenService.generateTokens({ ...userDto });
        await token_service_1.tokenService.saveToken(user.rows[0].id, tokens.refreshToken);
        return {
            ...tokens,
            user: { ...userDto }
        };
    }
    async login(email, password) {
        const user = await dbConfig_1.pool.query('SELECT * FROM person WHERE email = $1', [email]);
        if (user.rows.length === 0) {
            throw new Error('User not found');
        }
        const userDto = new user_dto_1.UserDto(user.rows[0]);
        const isPasswordEquals = await bcrypt_1.default.compare(password, user.rows[0].password);
        if (!isPasswordEquals) {
            throw new Error('Password is wrong');
        }
        const tokens = await token_service_1.tokenService.generateTokens({ ...userDto });
        await token_service_1.tokenService.saveToken(user.rows[0].id, tokens.refreshToken);
        return {
            ...tokens,
            user: { ...userDto }
        };
    }
    async logout(refreshToken) {
        await token_service_1.tokenService.removeToken(refreshToken);
    }
    async refresh(refreshToken) {
        if (!refreshToken) {
            throw new Error('No refresh token');
        }
        const userData = token_service_1.tokenService.validateRefreshToken(refreshToken);
        console.log(userData);
        const tokenFromDb = await token_service_1.tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw new Error('Invalid token');
        }
        const user = await dbConfig_1.pool.query('SELECT * FROM person WHERE id = $1', [userData.id]);
        const userDto = new user_dto_1.UserDto(user.rows[0]);
        const tokens = await token_service_1.tokenService.generateTokens({ ...userDto });
        await token_service_1.tokenService.saveToken(user.rows[0].id, tokens.refreshToken);
        return {
            ...tokens,
            user: { ...userDto }
        };
    }
    async getUsers() {
        const users = await dbConfig_1.pool.query('SELECT * FROM person');
        return users.rows;
    }
}
exports.userService = new UserService();
//# sourceMappingURL=user.service.js.map