import { Request, Response } from 'express'
import User from '~/models/schemas/User.schemas'
import generalService from '~/services/general.services'

export const getUserController = async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params

  const result = await generalService.getUserProfile(id)

  return res.json({
    message: 'Get user success',
    data: result
  })
}
