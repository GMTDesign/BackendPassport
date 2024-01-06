import { cartManager } from '../dao/models/Cart.js'
import { userManager } from "../dao/models/User.js"
import { hashear } from "../utils/cryptography.js"

export async function postController (req, res) {
    try {
        req.body.password = hashear(req.body.password)
        const userData = await userManager.create(req.body)
        //CUANDO SE CREA EL USUARIO, SE LE CREA UN CARRITO.
        //Y A ESE NUEVO CARRITO YA LE ASOCIAMOS EL ID DEL USUARIO
        await cartManager.create({products: [], clientId: userData._id})
        req.login(userData.toObject(), error => {
            if (error) {
                res.status(401).json({ status: 'error', message: error.message})
            } else {
                res.status(201).json({ status: 'success', payload: userData.toObject()})
            }
        })
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message})
    }
}

export async function getController (req, res) {
    const user = await userManager.findOne({ email: req['user'].email }, { password: 0 }).lean()
    res.json({ status: 'success', payload: user })
}