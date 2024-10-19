"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.positionsService = void 0;
const dbConfig_1 = require("../config/dbConfig");
const apiError_1 = require("../exceptions/apiError");
const userService_1 = require("./userService");
class PositionsService {
    async getPositions(userId) {
        const positions = (await dbConfig_1.pool.query('SELECT * FROM user_positions;')).rows;
        const tokens = (await dbConfig_1.pool.query('SELECT * FROM token;')).rows;
        const friends = await userService_1.userService.getFriends(userId);
        const mergedResults = friends.map(friend => {
            const location = positions.find(loc => loc.user_id === friend.id);
            const logged = tokens.find(token => token.user_id === friend.id);
            return location && logged ? {
                user_id: friend.id,
                username: friend.username,
                lat: location.lat,
                lng: location.lng
            } : null;
        }).filter(result => result !== null);
        return mergedResults;
    }
    async addPosition(userId, lat, lng) {
        if (!userId || !lat || !lng) {
            throw apiError_1.ApiError.BadRequest('User id, lat and lng are required');
        }
        const positionCandidate = await dbConfig_1.pool.query('SELECT * FROM user_positions WHERE user_id = $1 ', [userId]);
        if (positionCandidate.rows.length > 0) {
            const updatedPosition = await dbConfig_1.pool.query('UPDATE user_positions SET lat = $1, lng = $2 WHERE user_id = $3 RETURNING *;', [lat, lng, userId]);
            return updatedPosition.rows;
        }
        const newPosition = await dbConfig_1.pool.query('INSERT INTO user_positions (user_id, lat, lng) VALUES($1, $2, $3) RETURNING *', [userId, lat, lng]);
        return newPosition.rows;
    }
}
exports.positionsService = new PositionsService();
//# sourceMappingURL=positionsService.js.map