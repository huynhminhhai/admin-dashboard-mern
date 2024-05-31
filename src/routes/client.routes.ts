import { Router } from 'express'
import { getProductsController } from '~/controllers/client.controller'
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

export default clientRoutes
