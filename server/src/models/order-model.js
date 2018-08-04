const mongoose = require('mongoose')
const Schema = mongoose.Schema
let now = new Date()

const OrderSchema = new Schema({
  date: {
    type: String,
    default: now.getFullYear() + '-' + ('0' + (now.getMonth() + 1))
      .slice(-2) + '-' + ('0' + now.getDate()).slice(-2)
  },
  title: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  country: {
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
  adults: {
    type: Number,
    required: true
  },
  children: {
    type: Number,
    default: 0
  },
  dateOfArrival: {
    type: String,
    required: true
  },
  departureDate: {
    type: String,
    required: true
  },
  description: {
    type: String,
    validate: {
      validator: function (val) {
        return val.length <= 500
      }
    }
  }
})

const OrderModel = mongoose.model('orders', OrderSchema)

module.exports = OrderModel
