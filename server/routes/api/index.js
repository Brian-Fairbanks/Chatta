const express = require('express')
const router = express.Router()

const conversation = require('./conversation')
const message = require('./message')
const user = require('./user')

// Note that this router can only be accessed if authenticated by passport, based on ../index.js

router.use('/conversation', conversation)
router.use('/message', message)
router.use('/user', user)

module.exports = router
