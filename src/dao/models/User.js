import mongoose, { model } from "mongoose"
import { randomUUID } from 'crypto'
import { equalHashed } from "../../utils/cryptography.js"

const User = new mongoose.Schema({
    _id: { type: String, default: randomUUID },
    firstName: { type: String, require: true},
    lastName: { type: String, default: '(no especificado)'},
    email: { type: String, unique: true, required: true},
    password: { type: String, default: ('no especificada')}
}, {
    strict: 'throw',
    versionKey: false,
    statics: {
        login: async function(email, password) {
            let userData
            if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
                userData = {
                    firstName: 'Coder',
                    lastName: 'Coder',
                    email: 'adminCoder@coder.com',
                    rol: 'admin'
                }
            } else {
                const user = await mongoose.model('users').findOne({ email }).lean()
                if (!user) {
                    throw new Error('Login incorrecto')
                }
        
                if (!equalHashed(password, user.password)) {
                    throw new Error('la contraseña es incorrecta')
                }
                //GUARDAMOS EN LA COOKIE EL ID DEL USUARIO
                //ESTO EVITA IR A BUSCARLO A LA BASE DE DATOS
                userData = {
                    firstName: user['firstName'],
                    lastName: user['lastName'],
                    email: user['email'],
                    rol: 'usuario',
                    id: user['_id']
                }
            }
            return userData
        }
    }

})

export const userManager = mongoose.model('users', User)