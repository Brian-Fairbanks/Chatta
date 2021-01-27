const db = require("../models");

// Defining methods for the Chat Controller
module.exports = {
  findAll: function (req, res) {
    db.User.find(req.query)
      .sort({ date: -1 })
      .then((dbModel) => res.json({ dbModel }))
      .catch((err) => res.status(422).json(err));
  },

  findById: function (req, res) {
    db.User.findById(req.params.id)
      .then((dbModel) => res.json({ dbModel }))
      .catch((err) => res.status(422).json(err));
  },

  findByName: function (req, res) {
    const searchName = req.params.name
    const query = {$or:[{username:{$regex: searchName, $options: 'i'}},{firstName:{$regex: searchName, $options: 'i'}},{lastName:{$regex: searchName, $options: 'i'}}]}
    db.User.find(query)
      .then((dbModel) => res.json({ dbModel }))
      .catch((err) => res.status(422).json(err));
  },

  update: function (req, res) {
    db.User.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then((dbModel) => {
        res.json(dbModel);
      })
      .catch((err) => res.status(422).json(err));
  },
};
