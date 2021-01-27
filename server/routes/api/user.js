const router = require('express').Router()
const userController = require('../../controllers/userController')

router.route('/:id')
  .get(userController.findById)

router.route('/search/:name')
  .get(userController.findByName)

module.exports = router
