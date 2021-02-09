const db = require("../models");
const utils = require("./utils");
const socket = require("../socket");

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
    try {
      // create the message
      let newMessage = await db.Message.create(msg);

      // updated the most recent message in the conversation document
      await conversation.update({
        lastMessage: {
          message_id: newMessage._id,
          content: newMessage.content,
        },
        lastUpdate: Date.now(),
      });

      // import socket
      const io = socket.getInstance();
      // and fire off the message
      socket.fireMessage(newMessage, conversation.participants);
      // then return success to the user
      res.json(newMessage);
    } catch (err) {
      console.error(err);
      res.status(422).json(err);
    }
  },
};
