import { Router } from "express"
import { deleteController } from "../../controllers/sessionsControllers.js"
import passport from "passport"


export const sessionsRouter = Router()

sessionsRouter.post('/', 
    passport.authenticate('localLogin', {
        failWithError: true
    }),
    async (req, res, next) => {
        res.status(201).json({ status: 'success', message: 'Login exitoso!' })
    },
    (error, req, res, next) => {
        res.status(401).json({ status: 'error', message: error.message })
    }
)

sessionsRouter.delete('/current', deleteController)