"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dbConfig_1 = require("../config/dbConfig");
// TODO: add injection defence
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
    async removeToken(refreshToken) {
        await dbConfig_1.pool.query('DELETE FROM token WHERE refresh_token = $1', [refreshToken]);
    }
    async findToken(refreshToken) {
        const tokenData = await dbConfig_1.pool.query('SELECT * FROM token WHERE refresh_token = $1', [refreshToken]);
        return tokenData;
    }
    validateRefreshToken(refreshToken) {
        try {
            const userData = jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
            return userData;
        }
        catch (e) {
            return null;
        }
    }
    validateAccessToken(accessToken) {
        try {
            const userData = jsonwebtoken_1.default.verify(accessToken, process.env.JWT_ACCESS_SECRET);
            return userData;
        }
        catch (e) {
            return null;
        }
    }
}
exports.tokenService = new TokenService();
//# sourceMappingURL=tokenService.js.map