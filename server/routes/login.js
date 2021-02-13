const express = require("express");
const router = express.Router();
const utils = require("../controllers/utils");

router.post("/", async (req, res, next) => {
  // run the user passport jwt authentication
  return utils.login(req, res);
});

module.exports = router;
