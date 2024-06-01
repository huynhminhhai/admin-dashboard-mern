import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { PaginationRequestQuery } from '~/models/requests/Cilent.requests'
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
