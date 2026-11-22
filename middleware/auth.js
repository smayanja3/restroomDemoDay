function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}

// if already loggin keeps user off login/signup pages
function ensureGuest(req, res, next) {
    if (!req.isAuthenticated()) {
        return next()
    }
    res.redirect('/restrooms/map')
}

module.exports = { isLoggedIn, ensureGuest}