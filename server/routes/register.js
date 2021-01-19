const express = require('express')
const router = express.Router()

const db = require("../models");
// const passport = require("../config/passport");

router.post("/", function(req, res) {
  console.log(req.body);
  db.User.create({
    username: req.body.username,
    password: req.body.password,
    lastName: req.body.lastName,
    firstName: req.body.firstName
  })
    .then(function () {
      res.json(201, res);
    })
    .catch(function(err) {
      console.log(err);
      res.status(401).json(err);
    });
});

module.exports = router
