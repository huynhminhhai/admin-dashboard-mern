import { Router } from 'express'
import { getUserController } from '~/controllers/general.controller'
import { wrapRequestHandler } from '~/utils/handler'

const generalRoutes = Router()

generalRoutes.get('/user/:id', wrapRequestHandler(getUserController))

export default generalRoutes
