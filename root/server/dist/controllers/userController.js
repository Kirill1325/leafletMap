"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const userService_1 = require("../service/userService");
class UserController {
    async getUserById(req, res) {
        try {
            const { id } = req.params;
            const user = await userService_1.userService.getUserById(id);
            return res.json(user);
        }
        catch (e) {
            console.log(e);
        }
    }
}
exports.UserController = UserController;
//# sourceMappingURL=userController.js.map