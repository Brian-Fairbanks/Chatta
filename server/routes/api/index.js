const express = require("express");
const router = express.Router();
const passport = require("../../config/passport");

const conversation = require("./conversation");
const message = require("./message");

router.use("/conversation", conversation);
router.use("/message", message);

// // Example of using secure routes, which will require JWT Token passed in
// router.use(
//   '/example',
//   passport.authenticate('jwt', { session: false }),
//   function (req, res, next) {
//     res.status(200).send({ message: 'connected to a protected route!' })
//   }
// )

module.exports = router;
