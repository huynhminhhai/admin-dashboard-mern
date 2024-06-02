import { Router } from 'express'
import { getDashboardStat, getUserController } from '~/controllers/general.controller'
import { getUserValidator } from '~/middlewares/general.middleware'
import { wrapRequestHandler } from '~/utils/handler'

const generalRoutes = Router()

/**
 * Desc: Get user by id
 * Path: /user/:id
 * Method: GET
 */
generalRoutes.get('/user/:id', getUserValidator, wrapRequestHandler(getUserController))

/**
 * Desc: get dashboard stat
 * Path: /dashboard
 * Body: {currentMonth: string, currentYear: number, currentDay: string}
 */
generalRoutes.post('/dashboard', wrapRequestHandler(getDashboardStat))

export default generalRoutes
