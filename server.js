// set up ======================================================================
require('dotenv').config()
const express = require('express')
const connectDB = require('./config/database')
const app = express()
let PORT = process.env.PORT || 6030;

// connect to MongoDb ======================================================================
connectDB()

// express app ======================================================================
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.locals.apiKey = process.env.GOOGLE_MAPS_API_KEY



// GET ======================================================================
//---- will be the landing page but now add form
app.get('/', (req, res) => {
    res.redirect('/restrooms/new')
})
// //---- hide api key from view 
// app.get('/map', (req, res) => {
//     res.render('map', {apiKey: process.env.GOOGLE_MAPS_API_KEY})
// })

app.use('/restrooms', require('./routes/restrooms'))


app.listen(PORT, () => {
    console.log(`Server is BURNING OIL on PORT ${PORT}`)
})

