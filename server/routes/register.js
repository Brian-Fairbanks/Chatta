const express = require("express");
const router = express.Router();
const utils = require("../controllers/utils");

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
      return utils.login(req, res);
    })
    .catch(function (err) {
      console.error(err);
      res.status(400).json(formatError(err));
    });
});

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
