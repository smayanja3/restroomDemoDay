module.exports = {

    getSignup: (req, res) => {
        res.render('signup', { message: req.flash('signupMessage') })
    },

    getLogin: (req, res) => {
        res.render('login', { message: req.flash('loginMessage') })
    },

    getProfile: async (req, res) => {
        try {
            // show the bathrooms the user favorites
            //const favorites = await Favorite.find({ user: req.user.id }); favorites: favorites
            res.render("profile.ejs", { user: req.user });
        } catch (err) {
            console.log(err);
        }
    },

    getLogout: (req, res, next) => {
        req.logout((err) => {
            if (err) return next(err)
            res.redirect('/')
        })
    },

}
