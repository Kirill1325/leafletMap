"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.positionService = void 0;
const dbConfig_1 = require("../config/dbConfig");
class PositionsService {
    async sendPosition(userId, lat, lng) {
        const positionCandidate = await dbConfig_1.pool.query('SELECT * FROM positions WHERE user_id = $1 AND lat = $2 AND lng = $3', [userId, lat, lng]);
        // const prevPosition = await pool.query('SELECT * FROM positions WHERE user_id = $1', [userId])
        if (positionCandidate.rows.length) {
            return { status: 400 };
        }
        await dbConfig_1.pool.query('DELETE FROM positions WHERE user_id = $1', [userId]);
        await dbConfig_1.pool.query('INSERT INTO positions (user_id, lat, lng) VALUES ($1, $2, $3)', [userId, lat, lng]);
        return { status: 200 };
    }
}
exports.positionService = new PositionsService();
//# sourceMappingURL=positionService.js.map