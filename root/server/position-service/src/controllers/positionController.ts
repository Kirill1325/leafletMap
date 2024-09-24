import { Request, Response } from 'express'
import { positionService } from '../service/positionService'

export class PositionController {

    async connect(req: Request, res: Response) {
        res.setHeader('upgrade', 'websocket')
        res.setHeader('connection', 'Upgrade')
        res.send(req.headers)
    }

    async sendPosition(req: Request, res: Response) {
        const { userId, lat, lng } = req.body

        const status = await positionService.sendPosition(userId, lat, lng)

        res.status(status.status)
        res.send(status)
    }

}