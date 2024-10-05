"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.positionsRouter = void 0;
const express_1 = require("express");
const positionsController_1 = require("../controllers/positionsController");
exports.positionsRouter = (0, express_1.Router)();
const positionsController = new positionsController_1.PositionsController();
exports.positionsRouter.get('/', positionsController.getPositions);
exports.positionsRouter.post('/', positionsController.addPosition);
exports.positionsRouter.post('/clearToken', positionsController.clearToken);
exports.positionsRouter.post('/clearPos', positionsController.clearPos);
exports.positionsRouter.post('/clearUser', positionsController.clearUser);
//# sourceMappingURL=positionsRoutes.js.map