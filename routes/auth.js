const express = require('express')
const router = express.Router()
const passport = require('passport')
const authController = require('../controllers/auth')
const { ensureGuest } = require("../middleware/auth");


// signup ==============================================

router.get('/signup', ensureGuest, authController.getSignup)
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/restrooms/map',
    failureRedirect: '/signup',
    failureFlash: true,
}))
// removed the console.log becauase it expossed the users password

// login ===============================================

router.get('/login', ensureGuest,authController.getLogin)
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/restrooms/map',
    failureRedirect: '/login',
    failureFlash: true,
}))

// logout ===============================================

router.get('/logout', authController.getLogout)

module.exports = router