const express = require('express')
const router = express.Router()
const passport = require('../config/passport')
const jwt = require('jsonwebtoken')

router.post('/', async (req, res, next) => {
  // run the user passport jwt authentication
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err || !user) {
        return res.status(401).send({ error:"An error has occurred" })
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return res.status(401).send({ error })

        const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY)

        return res.json({ token })
      })
    } catch (error) {
      return res.status(401).send({ error })
    }
  })(req, res, next)
})

module.exports = router
