import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import mongoose from 'mongoose'
import { PaginationRequestQuery } from '~/models/requests/Cilent.requests'
import Transaction from '~/models/schemas/Transaction.schemas'
import User from '~/models/schemas/User.schemas'
import managementService from '~/services/management.services'

export const getUserRoleAdminController = async (
  req: Request<ParamsDictionary, any, any, PaginationRequestQuery>,
  res: Response
) => {
  const limit = Number(req.query.limit)
  const page = Number(req.query.page)

  const result = await managementService.getUserRoleAdmin({ limit, page })

  return res.json({
    message: 'Get list transaction success',
    data: {
      users: result.users,
      limit,
      page,
      totalPage: Math.ceil(result.total / limit)
    }
  })
}

export const getUserPerformanceController = async (
  req: Request<ParamsDictionary, any, any, PaginationRequestQuery>,
  res: Response
) => {
  const { id } = req.params
  const limit = Number(req.query.limit)
  const page = Number(req.query.page)

  const result = await managementService.getPerformance({ limit, page, id })

  res.json(result)
}
