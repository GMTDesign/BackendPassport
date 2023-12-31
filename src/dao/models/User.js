import mongoose, { model } from "mongoose"
import { randomUUID } from 'crypto'
import { equalHashed } from "../../utils/cryptography.js"

const User = new mongoose.Schema({
    _id: { type: String, default: randomUUID },
    firstName: { type: String, require: true},
    lastName: { type: String, require: true},
    email: { type: String, unique: true, require: true},
    password: { type: String, require: true}
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
                const user = await model('users').findOne({ email }).lean()
                if (!user) {
                    throw new Error('Login incorrecto')
                }
        
                if (!equalHashed(password, user.password)) {
                    throw new Error('la contraseña es incorrecta')
                }
        
                userData = {
                    firstName: user['firstName'],
                    lastName: user['lastName'],
                    email: user['email'],
                    rol: 'usuario'
                }
            }
            return userData
        }
    }

})

export const userManager = mongoose.model('users', User)