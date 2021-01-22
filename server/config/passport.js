const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const JWTStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt
require('dotenv').config()
const db = require('../models')

// use LocalStrategy with passport, in other words login with username and password
passport.use(
  'login',
  new LocalStrategy(function (email, password, done) {
    db.User.findOne({
      email
    }).then(function (dbUser) {
      // return false if the email does not exist
      if (!dbUser) {
        return done(null, false, {
          message: 'Incorrect email',
        })
      } else {
        // also return false if the email and password do not match
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

// custom cookie extractor for JWT Strategy
const cookieExtractor = function (req) {
  let token = null
  if (req && req.cookies) {
    token = req.cookies.jwt
  }
  return token
}

const opts = {}
opts.jwtFromRequest = ExtractJWT.fromExtractors([cookieExtractor])
opts.secretOrKey = process.env.JWT_KEY
passport.use(
  new JWTStrategy(opts, function (JWTPayload, done) {
    // decode JWT to get user id, and attempt to find that user
    db.User.findOne({ id: JWTPayload.sub }, function (err, user) {
      // return an error and false if null or invalid
      if (err) {
        return done(err, false)
      }
      // if the user is found, erturn done and pass back the user
      if (user) {
        return done(null, user)
        // if no error, but user not found, return with no user
      } else {
        return done(null, false)
      }
    })
  })
)

module.exports = passport
