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



// GET ======================================================================
//---- will be the landing page but now add form
app.get('/', (req, res) => {
    res.redirect('/restrooms/new')
})

app.use('/restrooms', require('./routes/restrooms'))


app.listen(PORT, () => {
    console.log(`Server is BURNING OIL on PORT ${PORT}`)
})

