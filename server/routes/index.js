const express = require('express')
const router = express.Router()
const registerRoutes = require('./register')
const loginRoute = require('./login')
const api = require('./api')
const passport = require('../config/passport')

router.get('/welcome', function (req, res, next) {
  res.status(200).send({ welcomeMessage: 'Step 1 (completed)' })
})

router.use('/register', registerRoutes)
router.use('/login', loginRoute)
// passport authentication applied on /api route
router.use('/api', passport.authenticate('jwt', { session: false }), api)

// Example of using secure routes, which will require JWT Token passed in
router.use(
  '/example',
  passport.authenticate('jwt', { session: false }),
  function (req, res, next) {
    res.status(200).send({ message: 'connected to a protected route!', user: req.user })
  }
)

module.exports = router
