export function onlyActives(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.redirect('/login')
    }
    next()
}