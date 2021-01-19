const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const db = require('../models')

// use LocalStrategy with passport, in other words login with email and password
passport.use(new LocalStrategy(
  function (username, password, done) {
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
        dbUser.validatePassword(password)
          .then((valid) => {
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
  }
))

// serialize and deserialize the user to keep authentication state across HTTP requests
passport.serializeUser(function (user, cb) {
  cb(null, user)
})

passport.deserializeUser(function (obj, cb) {
  cb(null, obj)
})

module.exports = passport