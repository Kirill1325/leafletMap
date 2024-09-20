import { pool } from "../config/dbConfig";

class UserService {

    async getUserById(id: string){
        const user = await pool.query('SELECT * FROM person WHERE id = $1', [id])
        return user.rows

    }


}

export const userService = new UserService()