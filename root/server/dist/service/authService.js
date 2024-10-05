"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const dbConfig_1 = require("../config/dbConfig");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userDto_1 = require("../dtos/userDto");
const tokenService_1 = require("./tokenService");
const apiError_1 = require("../exceptions/apiError");
// TODO: add injection defence
class AuthService {
    async registration(username, email, password) {
        console.log(username, email, password);
        if (!username || !email || !password) {
            throw apiError_1.ApiError.BadRequest('Username, email and password are required');
        }
        const mailCandidate = await dbConfig_1.pool.query('SELECT * FROM person WHERE email = $1', [email]);
        const usernameCandidate = await dbConfig_1.pool.query('SELECT * FROM person WHERE username = $1', [username]);
        if (mailCandidate.rows.length > 0) {
            throw apiError_1.ApiError.BadRequest('User with this email already exists');
        }
        if (usernameCandidate.rows.length > 0) {
            throw apiError_1.ApiError.BadRequest('This username already exists');
        }
        const hashPassword = await bcrypt_1.default.hash(password, 12);
        // TODO: add mail activation link
        const user = await dbConfig_1.pool.query('INSERT INTO person (username, email, password) VALUES ($1, $2, $3) RETURNING *', [username, email, hashPassword]);
        const userDto = new userDto_1.UserDto(user.rows[0]);
        const tokens = await tokenService_1.tokenService.generateTokens({ ...userDto });
        await tokenService_1.tokenService.saveToken(user.rows[0].id, tokens.refreshToken);
        return {
            ...tokens,
            user: { ...userDto }
        };
    }
    async login(email, password) {
        if (!email || !password) {
            throw apiError_1.ApiError.BadRequest('Email and password are required');
        }
        const user = await dbConfig_1.pool.query('SELECT * FROM person WHERE email = $1', [email]);
        if (user.rows.length === 0) {
            throw apiError_1.ApiError.BadRequest('User not found');
        }
        const userDto = new userDto_1.UserDto(user.rows[0]);
        const isPasswordEquals = await bcrypt_1.default.compare(password, user.rows[0].password);
        if (!isPasswordEquals) {
            throw apiError_1.ApiError.BadRequest('Password is wrong');
        }
        const tokens = await tokenService_1.tokenService.generateTokens({ ...userDto });
        await tokenService_1.tokenService.saveToken(user.rows[0].id, tokens.refreshToken);
        return {
            ...tokens,
            user: { ...userDto }
        };
    }
    async logout(refreshToken) {
        await tokenService_1.tokenService.removeToken(refreshToken);
    }
    async refresh(refreshToken) {
        if (!refreshToken) {
            throw apiError_1.ApiError.BadRequest('No refresh token');
        }
        const userData = tokenService_1.tokenService.validateRefreshToken(refreshToken);
        console.log(userData);
        const tokenFromDb = await tokenService_1.tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw apiError_1.ApiError.BadRequest('Invalid token');
        }
        const user = await dbConfig_1.pool.query('SELECT * FROM person WHERE id = $1', [userData.id]);
        const userDto = new userDto_1.UserDto(user.rows[0]);
        const tokens = await tokenService_1.tokenService.generateTokens({ ...userDto });
        await tokenService_1.tokenService.saveToken(user.rows[0].id, tokens.refreshToken);
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
exports.authService = new AuthService();
//# sourceMappingURL=authService.js.map