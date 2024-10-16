import { Router } from "express";
import { PositionsController } from "../controllers/positionsController";

export const positionsRouter = Router();

const positionsController = new PositionsController();  

positionsRouter.get('/', positionsController.getPositions);
positionsRouter.post('/', positionsController.addPosition);
// positionsRouter.post('/clearToken', positionsController.clearToken);
// positionsRouter.post('/clearPos', positionsController.clearPos);
// positionsRouter.post('/clearUser', positionsController.clearUser);