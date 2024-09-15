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
}
exports.userService = new UserService();
//# sourceMappingURL=user.service.js.map