// set up ======================================================================
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const app = express()
let PORT = process.env.PORT || 6030;
const Restroom = require('./models/restroom')

// connect to MongoDb ======================================================================
const configURL = process.env.MONGODB_URI
mongoose.connect(configURL)
mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB: ${mongoose.connection.name}`)
})

mongoose.connection.on('error', (err) => {
    console.log('NOT != MongoDB:', err.message)
})


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

//--- all restrooms 
app.get('/restrooms', (req, res) => {
    Restroom.find()
    .then(restrooms => res.render('restrooms', { restrooms }))
    .catch(err => {
        console.log(err.message)
        res.status(500).send('Something went wrong')
    })
})

//---- empty form
app.get('/restrooms/new', (req, res) => {
    res.render('new')
})

//------ filled out form
app.get('/restrooms/edit/:id', (req, res) => {
    Restroom.findById(req.params.id)
        .then(restroom => {
            if (!restroom) {
                return res.redirect('/restrooms/new')
            }
            res.render('edit', { restroom })
        })
        .catch(err => {
            console.log(err.message)
            res.redirect('/restrooms/new')
        })
})

//---- one restroom page
app.get('/restrooms/:id', (req, res) => {
    Restroom.findById(req.params.id)
        .then(restroom => {
            if (!restroom) {
                return res.redirect('/restrooms/new')
            }
            res.render('showOne', { restroom })
        })
        .catch(err => {
            console.log(err.message)
            res.redirect('/restrooms/new')
        })
})

// POST======================================================================
//---- adding a new restroom
app.post('/restrooms', (req, res) => {
    console.log(req.body)
    Restroom.create(req.body)
    .then(restroom => {
        res.redirect(`/restrooms/${restroom._id}`)
    })
    .catch(err => {
        console.log(err.message)
        res.redirect('/restrooms/new')
    })
})


// PUT ======================================================================
//--- edited Run
app.put('/restrooms/:id', (req, res) => {
    console.log('Put to body:', req.body)
    Restroom.findByIdAndUpdate(req.params.id, req.body, { runValidators: true })

        .then(() => {
            res.json({ message: 'Updated' })
        })
        .catch(err => {
            console.log(err.message)
            res.status(400).json({ error: err.message })
        })
})


// DELETE ===================================================================
app.delete('/restrooms/:id', (req, res) => {
    console.log('Deleted Restroom:', req.params.id)
    Restroom.findByIdAndDelete(req.params.id)
        .then(() => {
            res.json({ message: 'Deleted' })
        })
        .catch(err => {
            res.status(400).json({ error: err.message })
        })
})



app.listen(PORT, () => {
    console.log(`Server is BURNING OIL on PORT ${PORT}`)
})
