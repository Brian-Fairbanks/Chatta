const express = require('express')
const router = express.Router()
const registerRoutes = require('./register')
const loginRoute = require('./login')

router.get('/welcome', function (req, res, next) {
  res.status(200).send({ welcomeMessage: 'Step 1 (completed)' })
})

router.use('/register', registerRoutes)
router.use('/login', loginRoute)

module.exports = router
