import { pool } from "../config/dbConfig"
import { ApiError } from "../exceptions/apiError"
import { userService } from "./userService"

class PositionsService {

    async getPositions(userId: number) {

        // console.log('userId ', userId)
        // TODO: cache tokens and friends
        const positions = (await pool.query('SELECT * FROM user_positions;')).rows
        const friends = await userService.getFriends(userId)

        // const users = (await pool.query('SELECT * FROM person;')).rows
        // const tokens = (await pool.query('SELECT * FROM token;')).rows

        console.log('friends ', friends)
        console.log('positions ', positions)

        const mergedResults = friends.map(friend => {
            const location = positions.find(loc => loc.user_id === friend.id)
            // const logged = tokens.find(token => token.user_id === friend.id)
            // console.log('logged ', logged, friend.id)
            return location ? {
                user_id: friend.id,
                username: friend.username,
                lat: location.lat as number,
                lng: location.lng as number
            } : null;
        }).filter(result => result !== null)

        console.log('mergedResults ', mergedResults)

        return mergedResults
    }

    async addPosition(userId: number, lat: string, lng: string) {

        if (!userId || !lat || !lng) {
            throw ApiError.BadRequest('User id, lat and lng are required')
        }

        const positionCandidate = await pool.query('SELECT * FROM user_positions WHERE user_id = $1 ', [userId])

        if (positionCandidate.rows.length > 0) {

            await pool.query('UPDATE user_positions SET lat = $1, lng = $2 WHERE user_id = $3 RETURNING *;', [lat, lng, userId])
            return
        }

        await pool.query('INSERT INTO user_positions (user_id, lat, lng) VALUES($1, $2, $3) RETURNING *', [userId, lat, lng])

    }

}

export const positionsService = new PositionsService()