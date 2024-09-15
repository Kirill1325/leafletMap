"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dbConfig_1 = require("../config/dbConfig");
class TokenService {
    async generateTokens(payload) {
        const accessToken = jsonwebtoken_1.default.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' });
        const refreshToken = jsonwebtoken_1.default.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
        return { accessToken, refreshToken };
    }
    async saveToken(userId, refreshToken) {
        const tokenData = await dbConfig_1.pool.query('SELECT * FROM token WHERE user_id = $1', [userId]);
        let token;
        if (tokenData.rows.length > 0) {
            token = await dbConfig_1.pool.query('UPDATE token SET refresh_token = $1 WHERE user_id = $2', [refreshToken, userId]);
        }
        else {
            token = await dbConfig_1.pool.query('INSERT INTO token (user_id, refresh_token) VALUES ($1, $2)', [userId, refreshToken]);
        }
        return token;
    }
}
exports.tokenService = new TokenService();
//# sourceMappingURL=token.service.js.map