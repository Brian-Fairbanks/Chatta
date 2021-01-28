const express = require('express')
const router = express.Router()
const passport = require('../config/passport')
const jwt = require('jsonwebtoken')

router.post('/', async (req, res, next) => {
  // run the user passport jwt authentication
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err || !user) {
        return res.status(401).send({ error: 'An error has occurred' })
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return res.status(401).send({ error })

        const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY)
        // return a cookie, which expires in 2 weeks - set as httpOnly and secure.
        res.cookie('jwt', token, {
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7 * 2),
          httpOnly: true
        })
        // return JSON that user login succeeded
        return res.json({ success: true, token: 'set'})
      })
    } catch (error) {
      return res.status(401).send({ error })
    }
  })(req, res, next)
})

module.exports = router
