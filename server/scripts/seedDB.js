const mongoose = require('mongoose')
const db = require('../models')

// This file empties the Books collection and inserts the books below

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/Chatta')

const userSeed = [
  {
    firstName: 'Brian',
    lastName: 'Fairbanks',
    username: 'Akuma',
    email: 'brian.k.fairbanks@gmail.com'
  },
  {
    firstName: 'Surge',
    lastName: 'Bracamontes',
    username: 'Warsurge',
    email: 'surgebrock15@gmail.com'
  },
  {
    firstName: 'Jonathan',
    lastName: 'Andrews',
    username: 'ionathas78',
    email: 'ionathas78@hotmail.com'
  },
  {
    firstName: 'Jason',
    lastName: 'Strouphauer',
    username: 'jdstroup10',
    email: 'jdstroup@gmail.com'
  }
]

function seedUsers () {
  return new Promise((resolve, reject) => {
    db.User
      .remove({})
      .then(() => db.User.collection.insertMany(userSeed))
      .then(data => {
        console.log(data.result.n + ' records inserted!')
        return resolve('Finished!')
      })
      .catch(err => {
        console.error(err)
        reject('Error')
      })
  })
}

seedUsers()
