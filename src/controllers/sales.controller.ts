import { Request, Response } from 'express'
import salesService from '~/services/sales.services'

export const overallStateController = async (req: Request, res: Response) => {
  const result = await salesService.getOverallStat()

  return res.json({
    message: 'Get overall state success',
    data: result
  })
}
