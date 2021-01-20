const express = require("express");
const router = express.Router();
const db = require("../models");
const passport = require("../config/passport");
const jwt = require('jsonwebtoken');


router.post("/", async (req, res, next) => {
  // run the user passport jwt authentication
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error("An error occurred.");
        return res.status(401).send({error:info});
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return res.status(401).send({error:info});

        const body = { _id: user._id, username: user.username };
        const token = jwt.sign({ user: body }, process.env.JWT_KEY);

        return res.json({ token });
      });
    } catch (error) {
      return res.status(401).send({error:info});
    }
  })(req, res, next);
});

module.exports = router;
