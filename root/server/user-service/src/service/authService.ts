import { pool } from "../config/dbConfig";
import bcrypt from 'bcrypt'
import { UserDto } from "../dtos/userDto";
import { tokenService } from "./tokenService";
import { ApiError } from "../exceptions/apiError";

// TODO: add injection defence

class AuthService {

    async registration(username: string, email: string, password: string) {
        console.log(username, email, password)

        const mailCandidate = await pool.query('SELECT * FROM person WHERE email = $1', [email])
        const usernameCandidate = await pool.query('SELECT * FROM person WHERE username = $1', [username])

        if (mailCandidate.rows.length > 0) {
            throw ApiError.BadRequest('User with this email already exists')
        }
        if (usernameCandidate.rows.length > 0) {
            throw ApiError.BadRequest('This username already exists')
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

    async login(email: string, password: string) {

        const user = await pool.query('SELECT * FROM person WHERE email = $1', [email])

        if (user.rows.length === 0) {
            throw ApiError.BadRequest('User not found')
        }

        const userDto = new UserDto(user.rows[0])

        const isPasswordEquals = await bcrypt.compare(password, user.rows[0].password)

        if (!isPasswordEquals) {
            throw ApiError.BadRequest('Password is wrong')
        }

        const tokens = await tokenService.generateTokens({ ...userDto })

        await tokenService.saveToken(user.rows[0].id, tokens.refreshToken)

        return {
            ...tokens,
            user: { ...userDto }
        }
    }

    async logout(refreshToken: string) {
        await tokenService.removeToken(refreshToken)
    }

    async refresh(refreshToken: string) {

        if (!refreshToken) {
            throw ApiError.BadRequest('No refresh token')
        }

        const userData = tokenService.validateRefreshToken(refreshToken)
        console.log(userData)

        const tokenFromDb = await tokenService.findToken(refreshToken)

        if (!userData || !tokenFromDb) {
            throw ApiError.BadRequest('Invalid token')
        }

        const user = await pool.query('SELECT * FROM person WHERE id = $1', [userData.id])
        const userDto = new UserDto(user.rows[0])
        const tokens = await tokenService.generateTokens({ ...userDto })
        await tokenService.saveToken(user.rows[0].id, tokens.refreshToken)

        return {
            ...tokens,
            user: { ...userDto }
        }
    }

    async getUsers() {

        const users = await pool.query('SELECT * FROM person')

        return users.rows
    }

}

export const authService = new AuthService()