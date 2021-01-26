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

  findUser: function (req, res) {
    db.Message
      .find({ 'participants.user': req.user._id })
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
        await db.Conversation.findOneAndUpdate({ _id: dbModel.conversation }, { lastMessage: dbModel._id })
        res.json(dbModel)
      })
      .catch(err => res.status(422).json(err))
  },

  update: async function (req, res) {
    console.log(req.body)
    db.Message
      .findOneAndUpdate({ _id: req.params.id }, { deleted: false, ...req.body, updated: true })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  }
}
