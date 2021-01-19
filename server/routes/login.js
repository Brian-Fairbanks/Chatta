const express = require('express')
const router = express.Router()

const db = require('../models')
const passport = require('../config/passport')

router.post('/', passport.authenticate('local'), function (req, res) {
  console.log(req.body)
  res.json(req.user)
})

module.exports = router
