const express = require('express')
const router = express.Router()
const passport = require('passport')
const authController = require('../controllers/auth')

// signup ==============================================

router.get('/signup', authController.getSignup)
router.post('/signup', (req,res,next) => {
    console.log('signup:', req.body)
    next()
}, passport.authenticate('local-signup', {
    successRedirect: '/restrooms/map',
    failureRedirect: '/signup',
    failureFlash: true,
}))

// login ===============================================

router.get('/login', authController.getLogin)
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/restrooms/map',
    failureRedirect: '/login',
    failureFlash: true,
}))

// logout ===============================================

router.get('/logout', authController.getLogout)

module.exports = router