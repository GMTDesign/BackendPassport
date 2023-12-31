import { hashSync, compareSync, genSaltSync } from "bcrypt"

export function hashear(password) {
    return hashSync(password, genSaltSync(10))
}

export function equalHashed(received, saved) {
    return compareSync(received, saved)
}