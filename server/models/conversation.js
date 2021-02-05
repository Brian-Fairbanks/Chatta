const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
  title: {
    type: String,
  },
  substring: {
    type: String,
  },
  image: {
    type: String,
    default: null,
  },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  lastMessage: {
    message_id: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
    content: { type: String },
  },
  lastUpdate: {
    type: Date,
    default: Date.now,
  },
});

const Conversation = mongoose.model("Conversation", conversationSchema);
module.exports = Conversation;
