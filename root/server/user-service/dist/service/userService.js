"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const dbConfig_1 = require("../config/dbConfig");
class UserService {
    async getUserById(id) {
        const user = await dbConfig_1.pool.query('SELECT * FROM person WHERE id = $1', [id]);
        return user.rows;
    }
}
exports.userService = new UserService();
//# sourceMappingURL=userService.js.map