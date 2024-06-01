import { Router } from 'express'
import {
  getCustomersController,
  getProductsController,
  getTransactionController
} from '~/controllers/client.controller'
import { paginationValidator } from '~/middlewares/client.middlewares'
import { wrapRequestHandler } from '~/utils/handler'

const clientRoutes = Router()

/**
 * Desc: get list product
 * Path: /products
 * Method: GET
 * Query: {limit: number, page: number}
 */
clientRoutes.get('/products', paginationValidator, wrapRequestHandler(getProductsController))

/**
 * Desc get list customer
 * Path: /customers
 * Method: GET
 * Query: {limit: number, page: number}
 */
clientRoutes.get('/customers', paginationValidator, wrapRequestHandler(getCustomersController))

/**
 * Desc: get list transaction
 * Path: /transactions
 * Method: GET
 * Query: {limit: number, page: number, search: string}
 */
clientRoutes.get('/transactions', paginationValidator, wrapRequestHandler(getTransactionController))

export default clientRoutes
