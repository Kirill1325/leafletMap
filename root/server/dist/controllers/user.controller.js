"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
class UserController {
    init(req, res) {
        // res.setHeader('upgrade', 'websocket');
        // res.setHeader('connection', 'Upgrade');
        // res.writeHead(101)
        res.send('working');
    }
    async createUser(req, res) {
        const { username } = req.body;
        res.json(req.body);
        console.log(req.body);
        console.log(req.headers);
    }
}
exports.userController = new UserController();
//# sourceMappingURL=user.controller.js.map