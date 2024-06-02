import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { DashboradStatType } from '~/models/requests/general.requests'
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

export const getDashboardStat = async (req: Request<ParamsDictionary, any, DashboradStatType>, res: Response) => {
  const result = await generalService.getDashboardStat(req.body)

  return res.json({
    message: 'Get dashboard state success',
    data: result
  })
}
