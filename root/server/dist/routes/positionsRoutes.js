"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.positionsRouter = void 0;
const express_1 = require("express");
const positionsController_1 = require("../controllers/positionsController");
exports.positionsRouter = (0, express_1.Router)();
const positionsController = new positionsController_1.PositionsController();
exports.positionsRouter.post('/', positionsController.addPosition);
//# sourceMappingURL=positionsRoutes.js.map