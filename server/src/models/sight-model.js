const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SightSchema = new Schema({
  title: {
    ru: {
      type: String,
      validate: {
        validator: function (val) {
          return val.length > 5
        }
      },
      required: true
    },
    en: {
      type: String,
      validate: {
        validator: function (val) {
          return val.length > 5
        }
      },
      required: true
    },
    arm: {
      type: String,
      validate: {
        validator: function (val) {
          return val.length > 5
        }
      },
      required: true
    }
  },
  region: {
    ru: {
      type: String,
      required: true
    },
    en: {
      type: String,
      required: true
    },
    arm: {
      type: String,
      required: true
    }
  },
  distance: {
    type: Number,
    required: true
  },
  typeOfSight: {
    ru: {
      type: String,
      required: true
    },
    en: {
      type: String,
      required: true
    },
    arm: {
      type: String,
      required: true
    }
  },
  description: {
    ru: {
      type: String,
      validate: {
        validator: function (val) {
          return val.length > 10
        }
      },
      required: true
    },
    en: {
      type: String,
      validate: {
        validator: function (val) {
          return val.length > 10
        }
      },
      required: true
    },
    arm: {
      type: String,
      validate: {
        validator: function (val) {
          return val.length > 10
        }
      },
      required: true
    }
  },
  images: {
    type: [String],
    required: true
  },
  wayFromYerevan: {
    ru: {
      type: String,
      validate: {
        validator: function (val) {
          return val.length > 5
        }
      },
      required: true
    },
    en: {
      type: String,
      validate: {
        validator: function (val) {
          return val.length > 5
        }
      },
      required: true
    },
    arm: {
      type: String,
      validate: {
        validator: function (val) {
          return val.length > 5
        }
      },
      required: true
    }
  },
  weather: {
    ru: {
      type: String,
      validate: {
        validator: function (val) {
          return val.length > 5
        }
      },
      required: true
    },
    en: {
      type: String,
      validate: {
        validator: function (val) {
          return val.length > 5
        }
      },
      required: true
    },
    arm: {
      type: String,
      validate: {
        validator: function (val) {
          return val.length > 5
        }
      },
      required: true
    }
  },
  facts: [{
    _id: false,
    text: {
      ru: {
        type: String,
        validate: {
          validator: function (val) {
            return val.length > 5
          }
        },
        required: true
      },
      en: {
        type: String,
        validate: {
          validator: function (val) {
            return val.length > 5
          }
        },
        required: true
      },
      arm: {
        type: String,
        validate: {
          validator: function (val) {
            return val.length > 5
          }
        },
        required: true
      }
    }
  }]
})

const SightModel = mongoose.model('sights', SightSchema)

module.exports = SightModel
