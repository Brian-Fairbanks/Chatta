const router = require('express').Router()
const postController = require('../../controllers/messageController')

router.route('/')
  .post(postController.create)

router.route('/:id')
  .get(postController.findById)

router.route('/conversation/:id')
  .get(postController.findByConversation)

module.exports = router
