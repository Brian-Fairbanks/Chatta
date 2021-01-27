const router = require('express').Router()
const postController = require('../../controllers/messageController')

router.route('/')
  .get(postController.findUser)
  .post(postController.create)

router.route('/:id')
  .get(postController.findById)
  .put(postController.update)

router.route('/conversation/:id')
  .get(postController.findByConversation)

module.exports = router
