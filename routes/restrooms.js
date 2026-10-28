const express = require('express')
const router = express.Router()
const Restroom = require('../models/restroom')
//--- allows restrooms to exisit in the routes file -> from controllers file
const restrooms = require('../controllers/restrooms')

// GET =================================
//--- all restrooms 
router.get('/', restrooms.index)
//---- empty form
router.get('/new', restrooms.newForm)
//------ filled out form
router.get('/edit/:id', restrooms.editForm)
//---- one restroom page
router.get('/:id', restrooms.show)

// POST=================================
//---- adding a new restroom
router.post('/', restrooms.create)

// PUT =================================
//--- edited Run
router.put('/:id', restrooms.update)

// DELETE ==============================
router.delete('/:id', restrooms.destroy)

module.exports = router