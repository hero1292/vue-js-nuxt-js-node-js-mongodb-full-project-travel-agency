const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DailyTourSchema = new Schema({
  date: {
    type: String,
    required: true
  },
  repeat: {
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
  start: {
    type: String,
    required: true
  },
  end: {
    type: String,
    required: true
  },
  typesOfTour: {
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
          return val.length > 3
        }
      },
      required: true
    },
    en: {
      type: String,
      validate: {
        validator: function (val) {
          return val.length > 3
        }
      },
      required: true
    },
    arm: {
      type: String,
      validate: {
        validator: function (val) {
          return val.length > 3
        }
      },
      required: true
    }
  },
  days: {
    type: Number,
    required: true
  },
  prices: [{
    _id: false,
    amd: String,
    rur: String,
    usd: String,
    eur: String
  }],
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

DailyTourSchema.index({date: 1})

const DailyTourModel = mongoose.model('daily_tours', DailyTourSchema)

module.exports = DailyTourModel
