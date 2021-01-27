const db = require('../models')

// Defining methods for the Chat Controller
module.exports = {
  findAll: function (req, res) {
    db.Message
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },

  findById: function (req, res) {
    db.Message
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },

  findByConversation: function (req, res) {
    db.Message
      .find({ conversation: req.params.id })
      .sort({ timestamp: 1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },

  create: async function (req, res) {
    // anything passed from the frontend? use that
    // expecting to receive {content, conversation, (attachment)}
    const msg = req.body
    // then add extra data
    msg.author = req.user._id
    // Create the message
    db.Message
      .create(msg)
      .then(async (dbModel) => {
        // updated the most recent message in the conversation document
        await db.Conversation.findOneAndUpdate({ _id: dbModel.conversation }, { lastMessage: {message_id: dbModel._id, content: dbModel.content }})
        res.json(dbModel)
      })
      .catch(err => res.status(422).json(err))
  },
}
