import { userManager } from "../dao/models/User.js"
import { hashear } from "../utils/cryptography.js"

export async function postController (req, res) {
    try {
        req.body.password = hashear(req.body.password)
        const userData = await userManager.create(req.body)
        res.status(201).json({ status: 'success', payload: userData.toObject()})
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message})
    }
}