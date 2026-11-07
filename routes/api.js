const express = require('express')
const router = express.Router()
const api = require('../controllers/api')

router.get('/restrooms', api.restrooms)

module.exports = router