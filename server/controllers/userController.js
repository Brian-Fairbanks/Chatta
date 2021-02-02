const db = require('../models')

// Defining methods for the User Controller
module.exports = {
  findById: function (req, res) {
    db.User.findById(req.params.id)
      .then((dbModel) => res.json({ dbModel }))
      .catch((err) => res.status(422).json(err))
  },

  findByName: function (req, res) {
    const searchName = req.params.name
    const query = { $or: [{ username: { $regex: searchName, $options: 'i' } }, { firstName: { $regex: searchName, $options: 'i' } }, { lastName: { $regex: searchName, $options: 'i' } }] }
    db.User.find(query)
      .then((dbModel) => res.json({ dbModel }))
      .catch((err) => res.status(422).json(err))
  }
}
