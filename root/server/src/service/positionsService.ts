import { pool } from "../config/dbConfig"
import { ApiError } from "../exceptions/apiError"

class PositionsService {

    async getPositions() {

        const positions = await pool.query('SELECT * FROM user_positions;')

        return positions.rows
    }

    async addPosition(userId: number, lat: string, lng: string) {

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