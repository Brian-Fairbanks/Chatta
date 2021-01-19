const express = require('express')
const router = express.Router()

const db = require("../models");
// const passport = require("../config/passport");

router.post("/", function (req, res) {
  console.log(req.body);
  res.status(200).send({message:"post should work here!"})
})

module.exports = router
