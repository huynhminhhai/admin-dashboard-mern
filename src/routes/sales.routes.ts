import { Router } from 'express'
import { overallStateController } from '~/controllers/sales.controller'
import { wrapRequestHandler } from '~/utils/handler'

const salesRoutes = Router()

/**
 * Desc: Overall State
 * Path: /overall-state
 * Method: GET
 */
salesRoutes.get('/overall-state', wrapRequestHandler(overallStateController))

export default salesRoutes
