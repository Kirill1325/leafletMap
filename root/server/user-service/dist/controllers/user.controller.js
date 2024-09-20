"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("../service/user.service");
class UserController {
    async getUserById(req, res) {
        try {
            const { id } = req.params;
            const user = await user_service_1.userService.getUserById(id);
            return res.json(user);
        }
        catch (e) {
            console.log(e);
        }
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map