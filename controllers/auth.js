module.exports = {

    getSignup: (req, res) => {
        res.render('signup', { message: req.flash('signupMessage') })
    },

    getLogin: (req, res) => {
        res.render('login', { message: req.flash('loginMessage') })
    },

    getLogout: (req, res, next) => {
        req.logout((err) => {
            if (err) return next(err)
            res.redirect('/')
        })
    },

}
