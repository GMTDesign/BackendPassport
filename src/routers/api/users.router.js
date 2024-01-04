import { Router } from "express"
import { getController, postController } from "../../controllers/usersController.js"
import { onlyActives } from "../../middlewares/activeSession.js"


export const usersRouter = Router()

usersRouter.post('/', postController)

usersRouter.get('/current', onlyActives, getController)