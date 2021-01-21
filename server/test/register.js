const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app.js')

chai.should()
chai.use(chaiHttp)

// Check the Password
describe('/POST register', () => {
  it('it should not allow a user to be created without a password', (done) => {
    const user = {
      username: 'shums',
      firstName: 'Shums',
      lastName: 'Kassam',
      email: 'email@email.com'
    }
    chai.request(app)
      .post('/register/')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400)
        res.body.should.be.a('object')
        res.body.should.have.property('errors')
        res.body.errors.should.have.property('password')
        res.body.errors.password.should.have.property('kind').eql('required')
        done()
      })
  })
})

// Check the Password Again
describe('/POST register', () => {
  it('it should not allow a user to be created without a password over 6 characters', (done) => {
    const user = {
      username: 'shums',
      firstName: 'shums',
      lastName: 'kassam',
      email: 'email@email.com',
      password: 'test'
    }
    chai.request(app)
      .post('/register/')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400)
        res.body.should.be.a('object')
        res.body.should.have.property('errors')
        res.body.errors.should.have.property('password')
        res.body.errors.password.should.have.property('message').eql('Password should be longer')
        done()
      })
  })
})

// Check the Username
describe('/POST register', () => {
  it('it should not allow a user to be created without a username', (done) => {
    const user = {
      firstName: 'shums',
      lastName: 'kassam',
      password: 'testing'
    }
    chai.request(app)
      .post('/register/')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400)
        res.body.should.be.a('object')
        res.body.should.have.property('errors')
        res.body.errors.should.have.property('username')
        res.body.errors.username.should.have.property('kind').eql('required')
        done()
      })
  })
})

// Check the First Name
describe('/POST register', () => {
  it('it should not allow a user to be created without a first name', (done) => {
    const user = {
      username: 'shums',
      lastName: 'kassam',
      email: 'email@email.com',
      password: 'testing'
    }
    chai.request(app)
      .post('/register/')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400)
        res.body.should.be.a('object')
        res.body.should.have.property('errors')
        res.body.errors.should.have.property('firstName')
        res.body.errors.firstName.should.have.property('kind').eql('required')
        done()
      })
  })
})

// Check the Last Name
describe('/POST register', () => {
  it('it should not allow a user to be created without a last name', (done) => {
    const user = {
      username: 'shums',
      firstName: 'shums',
      email: 'email@email.com',
      password: 'testing'
    }
    chai.request(app)
      .post('/register/')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400)
        res.body.should.be.a('object')
        res.body.should.have.property('errors')
        res.body.errors.should.have.property('lastName')
        res.body.errors.lastName.should.have.property('kind').eql('required')
        done()
      })
  })
})

// Check the email
describe('/POST register', () => {
  it('it should not allow a user to be created without a last name', (done) => {
    const user = {
      username: 'shums',
      firstName: 'shums',
      password: 'testing'
    }
    chai.request(app)
      .post('/register/')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400)
        res.body.should.be.a('object')
        res.body.should.have.property('errors')
        res.body.errors.should.have.property('email')
        res.body.errors.email.should.have.property('kind').eql('required')
        done()
      })
  })
})

// Confirm it Works!
describe('/POST register', () => {
  it('it should allow a user with all valid fields', (done) => {
    const user = {
      username: 'shums',
      firstName: 'shums',
      lastName: 'kassam',
      email: 'email@email.com',
      password: 'testing'
    }
    chai.request(app)
      .post('/register/')
      .send(user)
      .end((err, res) => {
        res.should.have.status(201)
        done()
      })
  })
})

// will not allow duplicate usernames
describe('/POST register', () => {
  it('it should not allow a user with a duplicate username', (done) => {
    const user = {
      username: 'shums',
      firstName: 'shums',
      lastName: 'kassam',
      email: 'new@email.com',
      password: 'testing'
    }
    chai.request(app)
      .post('/register/')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400)
        res.body.should.be.a('object')
        res.body.should.have.property('keyPattern')
        res.body.keyPattern.should.have.property('username')
        done()
      })
  })
})

// will not allow duplicate emails
describe('/POST register', () => {
  it('it should not allow a user with a duplicate email', (done) => {
    const user = {
      username: 'newShums',
      firstName: 'shums',
      lastName: 'kassam',
      email: 'email@email.com',
      password: 'testing'
    }
    chai.request(app)
      .post('/register/')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400)
        res.body.should.be.a('object')
        res.body.should.have.property('keyPattern')
        res.body.keyPattern.should.have.property('email')
        done()
      })
  })
})
