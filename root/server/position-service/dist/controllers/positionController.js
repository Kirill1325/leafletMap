"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PositionController = void 0;
const positionService_1 = require("../service/positionService");
class PositionController {
    async connect(req, res) {
        res.setHeader('upgrade', 'websocket');
        res.setHeader('connection', 'Upgrade');
        res.send(req.headers);
    }
    async sendPosition(req, res) {
        const { userId, lat, lng } = req.body;
        const status = await positionService_1.positionService.sendPosition(userId, lat, lng);
        res.status(status.status);
        res.send(status);
    }
}
exports.PositionController = PositionController;
//# sourceMappingURL=positionController.js.map