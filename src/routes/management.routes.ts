import { Router } from 'express'
import { getUserRoleAdminController } from '~/controllers/management.controller'
import { paginationValidator } from '~/middlewares/client.middlewares'
import { wrapRequestHandler } from '~/utils/handler'

const managementRoutes = Router()

/**
 * Desc: Get list user for admin
 * Path: /admins
 * Query: {limit: number, page: number}
 */
managementRoutes.get('/admins', paginationValidator, wrapRequestHandler(getUserRoleAdminController))

export default managementRoutes
