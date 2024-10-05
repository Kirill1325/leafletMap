"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PositionsController = void 0;
const positionsService_1 = require("../service/positionsService");
class PositionsController {
    async getPositions(req, res, next) {
        try {
            const positions = await positionsService_1.positionsService.getPositions();
            return res.json(positions);
        }
        catch (e) {
            next(e);
        }
    }
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
    async clearToken(req, res, next) {
        try {
            await positionsService_1.positionsService.clearToken();
        }
        catch (e) {
            next(e);
        }
    }
    async clearPos(req, res, next) {
        try {
            await positionsService_1.positionsService.clearPos();
        }
        catch (e) {
            next(e);
        }
    }
    async clearUser(req, res, next) {
        try {
            await positionsService_1.positionsService.clearUser();
        }
        catch (e) {
            next(e);
        }
    }
}
exports.PositionsController = PositionsController;
//# sourceMappingURL=positionsController.js.map