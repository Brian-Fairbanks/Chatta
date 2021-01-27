const db = require('../models')

// Defining methods for the Chat Controller
module.exports = {
  findUsers: function (req, res) {
    db.Conversation.find({ 'participants': req.user._id })
      .sort({ date: -1 })
      .then((dbModel) => res.json({ dbModel }))
      .catch((err) => res.status(422).json(err))
  },

  findById: async function (req, res) {
    console.log('Searching by ID')
    try {
      // get room data
      const conversation = await db.Conversation.findById(req.params.id)
      // get all posted messages
      const messages = await db.Message.find({
        conversation: req.params.id
      }).sort({ timestamp: 1 })

      res.json({
        conversation,
        messages
      })
    } catch (err) {
      res.status(422).json(err)
    }
  },

  create: function (req, res) {
    // anything passed from the backend? use that
    const convo = req.body
    // otherwise set up empty participant list.
    if (!convo.participants) {
      convo.participants = []
    }
    // add self to participant last
    convo.participants.push(
      req.user._id
      )
    // and add self as owner
    convo.owner = req.user._id

    db.Conversation.create(convo)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err))
  },
}
