const db = require("../models");
const passport = require("../config/passport");
const jwt = require("jsonwebtoken");

module.exports = {
  isValidUserConversation: async function (id, user) {
    // get room data
    const conversation = await db.Conversation.findById(id);
    // validate user is in conversation
    if (!conversation.participants.includes(user)) {
      return false;
    }
    return true;
  },

  // Helper function to format the returned data on a 400 error
  login: function (req, res) {
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
  },
};
