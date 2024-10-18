import { Router } from "express";
import { PositionsController } from "../controllers/positionsController";

export const positionsRouter = Router();

const positionsController = new PositionsController();  

positionsRouter.post('/', positionsController.addPosition);
