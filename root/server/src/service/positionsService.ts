import { pool } from "../config/dbConfig"
import { ApiError } from "../exceptions/apiError"

class PositionsService {

    async getPositions() {

        const positions = (await pool.query('SELECT * FROM user_positions;')).rows
        const users = (await pool.query('SELECT * FROM person;')).rows
        const tokens = (await pool.query('SELECT * FROM token;')).rows

        const mergedResults = users.map(user => {
            const location = positions.find(loc => loc.user_id === user.id);
            const logged = tokens.find(token => token.user_id === user.id)
            return location && logged ? {
                user_id: user.id,
                username: user.username,
                email: user.email,
                lat: location.lat,
                lng: location.lng
            } : null;
        }).filter(result => result !== null);

        return mergedResults
    }

    async addPosition(userId: number, lat: string, lng: string) {

        if (!userId || !lat || !lng) {
            throw ApiError.BadRequest('User id, lat and lng are required')
        }

        const positionCandidate = await pool.query('SELECT * FROM user_positions WHERE user_id = $1 ', [userId])

        if (positionCandidate.rows.length > 0) {
            const updatedPosition = await pool.query('UPDATE user_positions SET lat = $1, lng = $2 WHERE user_id = $3 RETURNING *;', [lat, lng, userId])

            return updatedPosition.rows
        }

        const newPosition = await pool.query('INSERT INTO user_positions (user_id, lat, lng) VALUES($1, $2, $3) RETURNING *', [userId, lat, lng])

        return newPosition.rows
    }

}

export const positionsService = new PositionsService()