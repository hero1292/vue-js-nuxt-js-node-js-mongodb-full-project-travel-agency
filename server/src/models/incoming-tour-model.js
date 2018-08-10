const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TourSchema = new Schema({
  typesOfTour: {
    type: [String],
    enum: ['Classic', 'Adventure', 'Regional', 'Special', 'Winter', 'Budget'],
    required: true
  },
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
  country: {
    ru: {
      type: String,
      validate: {
        validator: function (val) {
          return val.length >= 3
        }
      },
      required: true
    },
    en: {
      type: String,
      validate: {
        validator: function (val) {
          return val.length >= 3
        }
      },
      required: true
    },
    arm: {
      type: String,
      validate: {
        validator: function (val) {
          return val.length >= 3
        }
      },
      required: true
    }
  },
  days: {
    type: Number,
    required: true
  },
  nights: {
    type: Number,
    required: true
  },
  prices: {
    amd: {
      type: String,
      required: true
    },
    rur: {
      type: String,
      required: true
    },
    usd: {
      type: String,
      required: true
    },
    eur: {
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
  groupSize: {
    type: String,
    required: true
  },
  accommodation: {
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
  bestPeriod: {
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
  startEndPoint: {
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
  arrayOfDays: [{
    _id: false,
    way: {
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
    text: {
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
    overnight: {
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
    }
  }],
  images: {
    type: [String],
    required: true
  },
  priceIncludes: [{
    _id: false,
    valueOfInc: {
      ru: {
        type: String
      },
      en: {
        type: String
      },
      arm: {
        type: String
      }
    }
  }],
  priceExcludes: [{
    _id: false,
    valueOfExc: {
      ru: {
        type: String
      },
      en: {
        type: String
      },
      arm: {
        type: String
      }
    }
  }],
  pleaseNotes: [{
    _id: false,
    valueOfNote: {
      ru: {
        type: String
      },
      en: {
        type: String
      },
      arm: {
        type: String
      }
    }
  }]
})

TourSchema.index({typesOfTour: 1})

const TourModel = mongoose.model('incoming-tours', TourSchema)

module.exports = TourModel
