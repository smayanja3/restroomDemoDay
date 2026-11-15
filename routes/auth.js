const express = require('express')
const router = express.Router()
const passport = require('passport')
const authController = require('../controllers/auth')

// signup ==============================================

router.get('/signup', authController.getSignup)
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true,
}))

// login ===============================================

router.get('/login', authController.getLogin)
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true,
}))

// logout ===============================================

router.get('/logout', authController.getLogout)

module.exports = router