const express = require('express')
const router = express.Router()
const Restroom = require('../models/restroom')


//--- all restrooms 
router.get('/', (req, res) => {
    Restroom.find()
    .then(restrooms => res.render('restrooms', { restrooms }))
    .catch(err => {
        console.log(err.message)
        res.status(500).send('Something went wrong')
    })
})

//---- empty form
router.get('/new', (req, res) => {
    res.render('new')
})


//------ filled out form
router.get('/edit/:id', (req, res) => {
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
router.get('/:id', (req, res) => {
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
router.post('/', (req, res) => {
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
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
    console.log('Deleted Restroom:', req.params.id)
    Restroom.findByIdAndDelete(req.params.id)
        .then(() => {
            res.json({ message: 'Deleted' })
        })
        .catch(err => {
            res.status(400).json({ error: err.message })
        })
})

module.exports = router