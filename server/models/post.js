const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chatroom",
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

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
