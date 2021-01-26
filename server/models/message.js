const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  conversation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Conversation",
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: { type: String, required: true },
  attachment: { type: String },
  timestamp: { type: Date, default: Date.now },
  deleted: { type: Boolean, default: false },
  updated: { type: Boolean, default: false },
});

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
