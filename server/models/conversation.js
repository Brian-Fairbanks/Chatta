const mongoose = require('mongoose')
const Schema = mongoose.Schema

const roomImage = 'https://3k67ko48fxrx2usj0z384y49-wpengine.netdna-ssl.com/wp-content/uploads/2016/06/anonymous-user-ico-300x300-200x200.png'

const conversationSchema = new Schema({
  title: {
    type: String
  },
  substring: {
    type: String
  },
  image: {
    type: String,
    default: roomImage
  },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
  lastMessage: {
      message_id: {type: mongoose.Schema.Types.ObjectId,ref: 'Message'},
      content: {type: String}
  },
  lastUpdate: {
    type: Date,
    default: Date.now
  }
})

const Conversation = mongoose.model('Conversation', conversationSchema)
module.exports = Conversation
