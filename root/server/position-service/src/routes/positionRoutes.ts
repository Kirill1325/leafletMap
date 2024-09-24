import { Router } from "express";
import { PositionController } from "../controllers/positionController";

export const positionRouter = Router()

const positionController = new PositionController()

positionRouter.get('/', positionController.connect)
positionRouter.post('/', positionController.sendPosition)