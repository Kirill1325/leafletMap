import { Request, Response, NextFunction } from 'express';
import { positionsService } from '../service/positionsService';

export class PositionsController {

    async addPosition(req: Request, res: Response, next: NextFunction) {

        try {
            const { userId, lat, lng } = req.body

            const position = await positionsService.addPosition(parseInt(userId), lat, lng)

            return res.json(position)
        } catch (e) {
            next(e)
        }
    }

}