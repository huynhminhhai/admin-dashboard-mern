import { Router } from 'express'
import { getUserController } from '~/controllers/general.controller'
import { getUserValidator } from '~/middlewares/general.middleware'
import { wrapRequestHandler } from '~/utils/handler'

const generalRoutes = Router()

generalRoutes.get('/user/:id', getUserValidator, wrapRequestHandler(getUserController))

export default generalRoutes
