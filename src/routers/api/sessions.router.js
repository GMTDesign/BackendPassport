import { Router } from "express"
import { deleteController, postController } from "../../controllers/sessionsControllers.js"
import { userManager } from "../../dao/models/User.js"


export const sessionsRouter = Router()

sessionsRouter.post('/',
    async (req, res, next) => {
        const { email, password } = req.body
        console.log(req.body)
        try {
            const userData = await userManager.login(email, password)
            req.login(userData, (error => {
                if (error) {
                    next(error)
                } else {
                    next()
                }
            }))
            next()
        } catch (error) {
            next(error)
        }
    },
    async (req, res, next) => {
        res.status(201).json({ status: 'success', message: 'Login exitoso!' })
    },
    (error, req, res, next) => {
        res.status(401).json({ status: 'error', message: error.message })
    }
)

sessionsRouter.delete('/current', deleteController)