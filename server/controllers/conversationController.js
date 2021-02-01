const db = require("../models");

// Defining methods for the Chat Controller
module.exports = {
  findUsers: function (req, res) {
    db.Conversation.find({ participants: req.user._id })
      .sort({ date: -1 })
      .then((dbModel) => res.json({ dbModel }))
      .catch((err) => res.status(422).json(err));
  },

  findById: async function (req, res) {
    try {
      // get room data
      const conversation = await db.Conversation.findById(req.params.id);
      //validate user is in conversation
      if (!conversation.participants.includes(req.user._id)) {
        return res
          .status(401)
          .json({ msg: "You are not a part of this conversation" });
      }
      // get all posted messages
      const messages = await db.Message.find({
        conversation: req.params.id,
      }).sort({ timestamp: 1 });

      const userData = await Promise.all(conversation.participants.map( async function (member){
        const user = await db.User.findOne({_id:member});
        return(
          {_id:member, username:user.username, image:user.image}
          );
      }))

      res.json({
        conversation,
        messages,
        participants:userData
      });
    } catch (err) {
      res.status(422).json(err);
    }
  },

  create: function (req, res) {
    // anything passed from the backend? use that
    const convo = req.body;
    // otherwise set up empty participant list.
    if (!convo.participants) {
      convo.participants = [];
    }
    // add self to participant last
    convo.participants.push(req.user._id);
    // and add self as owner
    convo.owner = req.user._id;

    db.Conversation.create(convo)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
};
