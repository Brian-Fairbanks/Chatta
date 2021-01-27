const router = require('express').Router()
const userController = require('../../controllers/userController')

router.route('/')
  .get(userController.findAll)

router.route('/:id')
  .get(userController.findById)
  .put(userController.update)

router.route('/search/:name')
  .get(userController.findByName)

module.exports = router
