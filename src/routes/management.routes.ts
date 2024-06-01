import { Router } from 'express'
import { getUserPerformanceController, getUserRoleAdminController } from '~/controllers/management.controller'
import { paginationValidator } from '~/middlewares/client.middlewares'
import { wrapRequestHandler } from '~/utils/handler'

const managementRoutes = Router()

/**
 * Desc: Get list user for admin
 * Path: /admins
 * Query: {limit: number, page: number}
 */
managementRoutes.get('/admins', paginationValidator, wrapRequestHandler(getUserRoleAdminController))

/**
 * Desc: Get performance by id
 * Path: /performance/:id
 * Query: {limit: number, page: number}
 */
managementRoutes.get('/performance/:id', paginationValidator, wrapRequestHandler(getUserPerformanceController))

export default managementRoutes
