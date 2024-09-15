import jwt from 'jsonwebtoken'
import { pool } from '../config/dbConfig'
import { QueryResult } from 'pg'
import { UserDto } from '../dtos/user.dto'

interface TokenData {
    email: string
    id: string
    isActivated: boolean
}

class TokenService {
    async generateTokens(payload: TokenData) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' })
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' })
        return { accessToken, refreshToken }
    }

    async saveToken(userId: number, refreshToken: string) {
        const tokenData = await pool.query('SELECT * FROM token WHERE user_id = $1', [userId])
        let token: QueryResult<any>
        if (tokenData.rows.length > 0) {
            token = await pool.query('UPDATE token SET refresh_token = $1 WHERE user_id = $2', [refreshToken, userId])
        } else {
            token = await pool.query('INSERT INTO token (user_id, refresh_token) VALUES ($1, $2)', [userId, refreshToken])
        }

        return token
    }
}


export const tokenService = new TokenService()