const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SocPackageSchema = new Schema({
  resort: {
    type: [String],
    required: true
  },
  title: {
    type: String,
    validate: {
      validator: function (val) {
        return val.length > 5
      }
    },
    required: true
  },
  tables: [{
    _id: false,
    headers: [{
      _id: false,
      title: String,
      value: [String]
    }],
    prices: [{
      _id: false,
      room: String,
      price1: String,
      price2: String,
      price3: String,
      price4: String,
      price5: String,
      price6: String,
      price7: String,
      price8: String,
      price9: String,
      price10: String
    }]
  }],
  description: {
    type: String,
    validate: {
      validator: function (val) {
        return val.length > 10
      }
    },
    required: true
  },
  arrival: {
    type: String,
    required: true
  },
  departure: {
    type: String,
    required: true
  },
  socPackages: [{
    _id: false,
    package: String
  }],
  images: {
    type: [String],
    required: true
  }
})

SocPackageSchema.index({resort: 1})

const SocPackageModel = mongoose.model('soc_packages', SocPackageSchema)

module.exports = SocPackageModel
