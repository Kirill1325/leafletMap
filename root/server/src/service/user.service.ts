import { pool } from "../config/dbConfig";
import bcrypt from 'bcrypt'
import { UserDto } from "../dtos/user.dto";
import { tokenService } from "./token.service";


class UserService {

    async registration(username: string, email: string, password: string) {
        const candidate = await pool.query('SELECT * FROM person WHERE email = $1', [email])
        if (candidate.rows.length > 0) {
            throw new Error('User already exists')
        }
        const hashPassword = await bcrypt.hash(password, 12)
        // TODO: add mail activation link

        const user = await pool.query('INSERT INTO person (username, email, password, created_at, is_activated, activation_link) VALUES ($1, $2, $3, $4, $5, $6 ) RETURNING *', [username, email, hashPassword, 123, true, 'link'])

        const userDto = new UserDto(user.rows[0])
        const tokens = await tokenService.generateTokens({ ...userDto })
        await tokenService.saveToken(user.rows[0].id, tokens.refreshToken)

        return {
            ...tokens,
            user: { ...userDto }
        }
    }

}

export const userService = new UserService()