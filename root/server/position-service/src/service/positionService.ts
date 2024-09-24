import { pool } from "../config/dbConfig"
import { IPosition } from "../models/positionModel"

class PositionsService {
    async sendPosition(userId: number, lat: number, lng: number) {
        const positionCandidate = await pool.query('SELECT * FROM positions WHERE user_id = $1 AND lat = $2 AND lng = $3', [userId, lat, lng])
        // const prevPosition = await pool.query('SELECT * FROM positions WHERE user_id = $1', [userId])

        if (positionCandidate.rows.length) {
            return { status: 400 }
        }

        await pool.query('DELETE FROM positions WHERE user_id = $1', [userId])

        await pool.query('INSERT INTO positions (user_id, lat, lng) VALUES ($1, $2, $3)', [userId, lat, lng])
        return { status: 200 }
    }

}

export const positionService = new PositionsService()