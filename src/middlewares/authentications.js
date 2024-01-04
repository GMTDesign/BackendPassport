import passport from "passport"
import { Strategy as LocalStrategy } from "passport-local"
import { Strategy as GitHubStrategy } from "passport-github2"
import { userManager } from "../dao/models/User.js"

const localLogin = new LocalStrategy({
    usernameField: 'email'
}, async function verification(username, password, done) {
    try {
        const userData = await userManager.login(username, password)
        done(null, userData)
    } catch (error) {
        done(error)
    }
}
)

passport.use('localLogin', localLogin)

const GITHUB_CLIENT_ID = 'Iv1.c1c9266ffeb880b4'
const GITHUB_CLIENT_SECRET = '9146043a1a1769e65cfe1b4612677ec5794e9c69'
const GITHUB_CB_URL = 'http://localhost:8080/githubcallback'

passport.use('githubLogin', new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: GITHUB_CB_URL
}, async (_,__, gitHubUser, done) => {
    let user = await userManager.findOne({ email: gitHubUser.username })
    if (!user) {
        user = await userManager.create({
            firstName: gitHubUser.displayName,
            email: gitHubUser.username
        })
    }
    done(null, user.toObject())
}))


passport.serializeUser((user, next) => { next(null, user) })
passport.deserializeUser((user, next) => { next(null, user) })

export const passportInitialize = passport.initialize()
export const passportSession = passport.session()