const db = require('../models')

module.exports = {
  isValidUserConversation: async function (id, user) {
    // get room data
    const conversation = await db.Conversation.findById(id)
    // validate user is in conversation
    if (!conversation.participants.includes(user)) {
      return false
    }
    return true
  }
}
