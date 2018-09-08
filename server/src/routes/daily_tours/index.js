/* eslint-disable standard/computed-property-even-spacing */
const express = require('express')
const router = express.Router()
const multer = require('multer')
const fs = require('fs')
const tour = require('../../models/daily-tour-model')

const uploads = '../src/client/static/img/daily_tours'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploads)
  },
  filename: function (req, file, cb) {
    let type = file.mimetype.split('/')
    cb(null, new Date().getTime() + '.' + type[1])
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
})

router.post('/daily_tours', upload.fields([{
  name: 'files[]',
  maxCount: 15
}]), (req, res) => {
  tour.create({
    date: req.body.date,
    repeat: req.body.repeat,
    start: req.body.start,
    end: req.body.end,
    typesOfDailyTour: req.body.typesOfDailyTour,
    title: req.body.title,
    country: req.body.country,
    daysAndNights: req.body.daysAndNights,
    prices: req.body.prices,
    description: req.body.description,
    groupSize: req.body.groupSize,
    accommodation: req.body.accommodation,
    bestPeriod: req.body.bestPeriod,
    startEndPoint: req.body.startEndPoint,
    arrayOfDays: req.body.arrayOfDays,
    images: req.body.images,
    priceIncludes: req.body.priceIncludes,
    priceExcludes: req.body.priceExcludes,
    pleaseNotes: req.body.pleaseNotes
  })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      unlinkImages(req.body.images).then(() => {
        res.status(422).send({
          message: err.message
        })
      })
    })
})

router.get('/:lang/daily_tours', (req, res) => {
  let tours = tour.find()
  if (req.query.type) {
    tours.where('date', req.query.type)
  }
  tours.select(setLang(req.params.lang))
    .sort({_id: -1})
    .exec((err, tours) => {
      if (err) {
        return res.status(400).send({
          message: err
        })
      } else {
        res.json(tours)
      }
    })
})

router.get('/:lang/daily_tours/:id', (req, res) => {
  tour.findById(req.params.id, 'date ' +
    'repeat ' +
    'start ' +
    'end ' +
    'typesOfDailyTour ' +
    'title ' +
    'country ' +
    'daysAndNights ' +
    'prices ' +
    'description ' +
    'groupSize ' +
    'accommodation ' +
    'bestPeriod ' +
    'startEndPoint ' +
    'arrayOfDays ' +
    'images ' +
    'priceIncludes ' +
    'priceExcludes ' +
    'pleaseNotes', (err, tour) => {
    if (err) {
      res.sendStatus(500)
    } else {
      res.send(tour)
    }
  }).select(setLang(req.params.lang))
})

router.get('/daily_tours/:id', (req, res) => {
  tour.findById(req.params.id, 'date ' +
    'repeat ' +
    'start ' +
    'end ' +
    'typesOfDailyTour ' +
    'title ' +
    'country ' +
    'daysAndNights ' +
    'prices ' +
    'description ' +
    'groupSize ' +
    'accommodation ' +
    'bestPeriod ' +
    'startEndPoint ' +
    'arrayOfDays ' +
    'images ' +
    'priceIncludes ' +
    'priceExcludes ' +
    'pleaseNotes', (err, tour) => {
    if (err) {
      res.sendStatus(500)
    } else {
      res.send(tour)
    }
  })
})

router.put('/daily_tours/:id', (req, res) => {
  tour.update({_id: req.params.id}, {
    $set: {
      date: req.body.date,
      repeat: req.body.repeat,
      start: req.body.start,
      end: req.body.end,
      typesOfDailyTour: req.body.typesOfDailyTour,
      title: req.body.title,
      country: req.body.country,
      daysAndNights: req.body.daysAndNights,
      prices: req.body.prices,
      description: req.body.description,
      groupSize: req.body.groupSize,
      accommodation: req.body.accommodation,
      bestPeriod: req.body.bestPeriod,
      startEndPoint: req.body.startEndPoint,
      arrayOfDays: req.body.arrayOfDays,
      priceIncludes: req.body.priceIncludes,
      priceExcludes: req.body.priceExcludes,
      pleaseNotes: req.body.pleaseNotes
    }
  })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send(err)
    })
})

router.delete('/:lang/daily_tours/:id', (req, res) => {
  tour.findOneAndRemove({_id: req.params.id}, (err, doc) => {
    if (err) throw err
    res.send('ok')
  })
})

function unlinkImages(images) {
  return new Promise((resolve, reject) => {
    for (let file of images) {
      fs.unlink(uploads + '/' + file, () => {
        console.log(`File "${file}" removed`)
      })

      resolve()
    }
  })
}

function setLang(params) {
  let lang
  if (params === 'ru') {
    lang = 'ru'
  } else if (params === 'en') {
    lang = 'en'
  } else if (params === 'arm') {
    lang = 'arm'
  }

  let projection = {'_id': true}
  projection['date'] = true
  projection['repeat.' + lang] = true
  projection['start'] = true
  projection['end'] = true
  projection['typesOfDailyTour.' + lang] = true
  projection['title.' + lang] = true
  projection['country.' + lang] = true
  projection['daysAndNights.' + lang] = true
  projection['prices'] = true
  projection['description.' + lang] = true
  projection['groupSize'] = true
  projection['accommodation.' + lang] = true
  projection['bestPeriod.' + lang] = true
  projection['startEndPoint.' + lang] = true
  projection['arrayOfDays.way.' + lang] = true
  projection['arrayOfDays.text.' + lang] = true
  projection['arrayOfDays.overnight.' + lang] = true
  projection['images'] = true
  projection['priceIncludes.valueOfInc.' + lang] = true
  projection['priceExcludes.valueOfExc.' + lang] = true
  projection['pleaseNotes.valueOfNote.' + lang] = true

  return projection
}

module.exports = router
