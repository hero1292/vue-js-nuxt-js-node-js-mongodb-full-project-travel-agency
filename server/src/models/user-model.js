const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
      validator: function (val) {
        return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,4}$/.test(val)
      }
    }
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (val) {
        return val.length >= 6
      }
    }
  },
  roles: {
    type: String,
    enum: ['Super Admin', 'Admin', 'Moderator'],
    required: true
  },
  avatar: {
    type: String
  }
})

const UserModel = mongoose.model('users', UserSchema)

module.exports = UserModel
