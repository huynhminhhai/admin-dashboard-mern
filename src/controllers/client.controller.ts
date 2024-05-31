import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { PaginationRequestQuery } from '~/models/requests/Cilent.requests'
import clientService from '~/services/client.services'

export const getProductsController = async (
  req: Request<ParamsDictionary, any, any, PaginationRequestQuery>,
  res: Response
) => {
  const limit = Number(req.query.limit)
  const page = Number(req.query.page)

  const result = await clientService.getProducts({ limit, page })

  return res.json({
    message: 'Get products success',
    data: {
      products: result.productWithStat,
      limit,
      page,
      totalPage: Math.ceil(result.total / limit)
    }
  })
}
