const db = require("../models");
const utils = require("./utils");

// Defining methods for the Chat Controller
module.exports = {
  findByConversation: async function (req, res) {
    // Authorize user
    const authorize = await utils.isValidUserConversation(
      req.params.id,
      req.user._id
    );
    if (!authorize) {
      return res
        .status(401)
        .json({ msg: "You are not a part of this conversation" });
    }
    //  Only if they are a part of this conversation...
    db.Message.find({ conversation: req.params.id })
      .sort({ timestamp: 1 })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  create: async function (req, res) {
    // Authorize user
    const conversation = await db.Conversation.findById(req.body.conversation);
    // validate user is in conversation
    if (!conversation.participants.includes(req.user._id)) {
      return res
        .status(401)
        .json({ msg: "You are not a part of this conversation" });
    }
    //  Only if they are a part of this conversation...
    // check if anything was passed from the frontend? use that
    // expecting to receive {content, conversation, (attachment)}
    const msg = req.body;
    // then add extra data
    msg.author = req.user._id;
    // Create the message
    db.Message.create(msg)
      .then(async (dbModel) => {
        // updated the most recent message in the conversation document
        await conversation.update({
          lastMessage: { message_id: dbModel._id, content: dbModel.content },
          lastUpdate: Date.now(),
        });
        res.json(dbModel);
      })
      .catch((err) => res.status(422).json(err));
  },
};
