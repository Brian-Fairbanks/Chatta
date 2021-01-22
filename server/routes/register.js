const express = require('express')
const router = express.Router()

const db = require('../models')

router.post('/', function (req, res) {
  const newUser = db.User.create({
    username: req.body.username,
    password: req.body.password,
    lastName: req.body.lastName,
    firstName: req.body.firstName,
    email: req.body.email
  })
    .then(function () {
      res.status(201).json(newUser)
    })
    .catch(function (err) {
      console.log(err)
      res.status(400).json(err)
    })
})

module.exports = router
