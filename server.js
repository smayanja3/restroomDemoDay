// set up ======================================================================
require('dotenv').config()
const express = require('express')
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')
const connectDB = require('./config/database')

const app = express()
let PORT = process.env.PORT || 6030;

// configure ======================================================================
require('./config/passport')(passport) // pass passport for the config from passport.js

// express app ======================================================================
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.locals.apiKey = process.env.GOOGLE_MAPS_API_KEY

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false, // does not resave the session if nothing changed only saves after cahnges
    saveUninitialized: false, // do not create session for non users
}))

app.use(passport.initialize())
app.use(passport.session()) // keeps you looged in
app.use(flash()) // flash messages stored in session

// makes the logged in user available to ever view 
app.use((req,res,next) => {
    res.locals.user = req.user || null
    next()
})

// routes ======================================================================
app.use('/', require('./routes/landing')) 
app.use('/', require('./routes/auth'))
app.use('/restrooms', require('./routes/restrooms'))
app.use('/api', require('./routes/api'))

// connect to MongoDb ======================================================================
// only connects t
connectDB().then(() => {
    app.listen(PORT, () => {
    console.log(`Server is BURNING OIL on PORT ${PORT}`)
})
})



// app.listen(PORT, () => {
//     console.log(`Server is BURNING OIL on PORT ${PORT}`)
// })

