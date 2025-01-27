const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

const userSchema = new Schema({
  username: {
    type: String,
    trim: true,
    unique: true,
    required: "Username is Required",
  },
  password: {
    type: String,
    trim: true,
    required: "Password is Required",
    validate: [({ length }) => length >= 6, "Password should be longer"],
  },
  email: {
    type: String,
    unique: true,
    required: "email is Required",
    match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
  },
  firstName: {
    type: String,
    trim: true,
    match: [/^[a-zA-Z0-9]+$/, "is invalid"],
    required: "First Name is required",
  },
  lastName: {
    type: String,
    trim: true,
    match: [/^[a-zA-Z0-9]+$/, "is invalid"],
    required: "Last Name is required",
  },
  tagLine: {
    type: String,
  },
  status: {
    type: String,
  },
  image: {
    type: String,
    default: null,
  },
});

// on creating/changing a user...
userSchema.pre("save", async function save(next) {
  // check if password has been changed
  if (!this.isModified("password")) {
    return next();
  }
  // and hash the password if it has
  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

// password validation
userSchema.methods.validatePassword = async function validatePassword(data) {
  return bcrypt.compare(data, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
