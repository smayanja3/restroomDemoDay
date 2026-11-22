// set up ======================================================================
require('dotenv').config()
const express = require('express')
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')
const connectDB = require('./config/database')

const app = express()
let PORT = process.env.PORT || 6030;

// connect to MongoDb ======================================================================
connectDB()

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
    res.locals.path = req.path // now ever partial and view know is someone is logged in 
    next()
})

// routes ======================================================================
app.use('/', require('./routes/landing')) 
app.use('/', require('./routes/auth'))
app.use('/restrooms', require('./routes/restrooms'))
app.use('/review', require('./routes/reviews'))
app.use('/api', require('./routes/api'))



app.listen(PORT, () => {
    console.log(`Server is BURNING OIL on PORT ${PORT}`)
})

