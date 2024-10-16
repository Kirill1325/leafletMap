"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.positionsRouter = void 0;
const express_1 = require("express");
const positionsController_1 = require("../controllers/positionsController");
exports.positionsRouter = (0, express_1.Router)();
const positionsController = new positionsController_1.PositionsController();
exports.positionsRouter.get('/', positionsController.getPositions);
exports.positionsRouter.post('/', positionsController.addPosition);
// positionsRouter.post('/clearToken', positionsController.clearToken);
// positionsRouter.post('/clearPos', positionsController.clearPos);
// positionsRouter.post('/clearUser', positionsController.clearUser);
//# sourceMappingURL=positionsRoutes.js.map