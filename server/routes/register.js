const express = require("express");
const router = express.Router();
const passport = require("../config/passport");
const jwt = require("jsonwebtoken");

const db = require("../models");

router.post("/", function (req, res) {
  const newUser = db.User.create({
    username: req.body.username,
    password: req.body.password,
    lastName: req.body.lastName,
    firstName: req.body.firstName,
    email: req.body.email,
  })
    .then(function () {
      // strange bit of of coding where passport is hardcoded to accept "username", but we want to authenticate on "email"
      req.body.username = req.body.email;
      return login(req, res);
    })
    .catch(function (err) {
      console.error(err);
      res.status(400).json(formatError(err));
    });
});

// Helper function to format the returned data on a 400 error
function login(req, res) {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        console.error(err);
        return res.status(401).send({
          error: "An error has occurred",
        });
      }

      req.login(user, { session: false }, async (error) => {
        if (error) {
          console.error(error);
          return res.status(401).send({ error });
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);
        // return a cookie, which expires in 2 weeks - set as httpOnly and secure.
        res.cookie("jwt", token, {
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7 * 2),
          httpOnly: true,
        });
        // return JSON that user login succeeded
        return res.status(201).json({ success: true, token: "set" });
      });
    } catch (error) {
      console.error(error);
      return res.status(401).send({ error });
    }
  })(req, res);
}

function formatError(err) {
  const errorMessage = {
    severity: "error",
    msg: err,
    name: null,
  };
  // is the error username related?
  if (err.keyValue && err.keyValue.username) {
    errorMessage.msg = `${err.keyValue.username} is already taken`;
    errorMessage.name = "username";
  }
  // is the error email related?
  if (err.keyValue && err.keyValue.email) {
    errorMessage.msg = `${err.keyValue.email} is already taken`;
    errorMessage.name = "email";
  }

  // Return the formatted error message
  return errorMessage;
}

module.exports = router;
