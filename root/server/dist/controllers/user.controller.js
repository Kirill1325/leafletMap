"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
class UserController {
    async createUser(req, res) {
        // const { username } = req.body
        res.send(req.body);
        console.log(req.body);
        console.log(req.headers);
    }
}
exports.userController = new UserController();
//# sourceMappingURL=user.controller.js.map