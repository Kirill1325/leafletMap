"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.positionRouter = void 0;
const express_1 = require("express");
const positionController_1 = require("../controllers/positionController");
exports.positionRouter = (0, express_1.Router)();
const positionController = new positionController_1.PositionController();
exports.positionRouter.get('/', positionController.connect);
exports.positionRouter.post('/', positionController.sendPosition);
//# sourceMappingURL=positionRoutes.js.map