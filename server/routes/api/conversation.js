const router = require('express').Router()
const chatController = require('../../controllers/conversationController')

router.route('/')
  .get(chatController.findUsers)
  .post(chatController.create)

router
  .route('/:id')
  .get(chatController.findById)
  .put(chatController.update)

module.exports = router
