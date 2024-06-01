import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { PaginationRequestQuery, TransactionRequestQuery } from '~/models/requests/Cilent.requests'
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

export const getCustomersController = async (
  req: Request<ParamsDictionary, any, any, PaginationRequestQuery>,
  res: Response
) => {
  const limit = Number(req.query.limit)
  const page = Number(req.query.page)

  const result = await clientService.getCustomers({ limit, page })

  return res.json({
    message: 'Get list customer success',
    data: {
      users: result.users,
      limit,
      page,
      totalPage: Math.ceil(result.total / limit)
    }
  })
}

export const getTransactionController = async (
  req: Request<ParamsDictionary, any, any, TransactionRequestQuery>,
  res: Response
) => {
  const limit = Number(req.query.limit)
  const page = Number(req.query.page)
  const search = req.query.search

  const result = await clientService.getTransactions({ limit, page, search })

  return res.json({
    message: 'Get list transaction success',
    data: {
      transactions: result.transactions,
      limit,
      page,
      totalPage: Math.ceil(result.total / limit)
    }
  })
}
