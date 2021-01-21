const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const JWTStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt
require('dotenv').config()
const db = require('../models')

// use LocalStrategy with passport, in other words login with username and password
passport.use(
  'login',
  new LocalStrategy(function (username, password, done) {
    db.User.findOne({
      username: username
    }).then(function (dbUser) {
      // return false if the username does not exist
      if (!dbUser) {
        return done(null, false, {
          message: 'Incorrect username'
        })
      } else {
        // also return false if the username and password do not match
        dbUser.validatePassword(password).then((valid) => {
          if (valid) {
            return done(null, dbUser)
          } else {
            return done(null, false, {
              message: 'Incorrect password'
            })
          }
        })
      }
    })
  })
)

passport.use(
  new JWTStrategy(
    // get JWT token passed in request
    {
      secretOrKey: process.env.JWT_KEY,
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
    },
    // check if the token is valid
    async (token, done) => {
      try {
        // return done if it is,
        return done(null, token.user)
      } catch (error) {
        // return error if it is no
        done(error)
      }
    }
  )
)

module.exports = passport
