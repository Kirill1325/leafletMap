"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PositionsController = void 0;
const positionsService_1 = require("../service/positionsService");
class PositionsController {
    async addPosition(req, res, next) {
        try {
            const { userId, lat, lng } = req.body;
            const position = await positionsService_1.positionsService.addPosition(parseInt(userId), lat, lng);
            return res.json(position);
        }
        catch (e) {
            next(e);
        }
    }
}
exports.PositionsController = PositionsController;
//# sourceMappingURL=positionsController.js.map