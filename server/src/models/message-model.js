const mongoose = require('mongoose')
const Schema = mongoose.Schema
let now = new Date()

const MessageSchema = new Schema({
  date: {
    type: String,
    default: now.getFullYear() + '-' + ('0' + (now.getMonth() + 1))
      .slice(-2) + '-' + ('0' + now.getDate()).slice(-2)
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    validate: {
      validator: function (val) {
        return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,4}$/.test(val)
      }
    },
    required: true
  },
  description: {
    type: String,
    validate: {
      validator: function (val) {
        return val.length <= 500
      }
    },
    required: true
  }
})

const MessageModel = mongoose.model('message', MessageSchema)

module.exports = MessageModel
