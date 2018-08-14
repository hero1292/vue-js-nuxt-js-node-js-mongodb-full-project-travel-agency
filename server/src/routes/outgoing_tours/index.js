/* eslint-disable standard/computed-property-even-spacing */
const express = require('express')
const router = express.Router()
const multer = require('multer')
const fs = require('fs')
const tour = require('../../models/outgoing-tour-model')

const uploads = '../src/client/static/img/outgoing_tours'

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

router.post('/outgoing_tours', upload.fields([{
  name: 'files[]',
  maxCount: 15
}]), (req, res) => {
  tour.create({
    title: req.body.title,
    country: req.body.country,
    days: req.body.days,
    nights: req.body.nights,
    prices: req.body.prices,
    description: req.body.description,
    groupSize: req.body.groupSize,
    accommodation: req.body.accommodation,
    bestPeriod: req.body.bestPeriod,
    startEndPoint: req.body.startEndPoint,
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

router.get('/:lang/outgoing_tours', (req, res) => {
  tour.find({}, (err, tours) => {
    if (err) {
      return res.status(400).send({
        message: err
      })
    } else {
      res.json(tours)
    }
  }).select(setLang(req.params.lang)).sort({_id: -1})
})

router.get('/:lang/outgoing_tours/:id', (req, res) => {
  tour.findById(req.params.id, 'title ' +
    'country ' +
    'days ' +
    'nights ' +
    'prices ' +
    'description ' +
    'groupSize ' +
    'accommodation ' +
    'bestPeriod ' +
    'startEndPoint ' +
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

router.get('/outgoing_tours/:id', (req, res) => {
  tour.findById(req.params.id, 'title ' +
    'country ' +
    'days ' +
    'nights ' +
    'prices ' +
    'description ' +
    'groupSize ' +
    'accommodation ' +
    'bestPeriod ' +
    'startEndPoint ' +
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

router.put('/outgoing_tours/:id', (req, res) => {
  tour.update({_id: req.params.id}, {
    $set: {
      title: req.body.title,
      country: req.body.country,
      days: req.body.days,
      nights: req.body.nights,
      prices: req.body.prices,
      description: req.body.description,
      groupSize: req.body.groupSize,
      accommodation: req.body.accommodation,
      bestPeriod: req.body.bestPeriod,
      startEndPoint: req.body.startEndPoint,
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

router.delete('/:lang/outgoing_tours/:id', (req, res) => {
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
  projection['title.' + lang] = true
  projection['country.' + lang] = true
  projection['days'] = true
  projection['nights'] = true
  projection['prices'] = true
  projection['description.' + lang] = true
  projection['groupSize'] = true
  projection['accommodation.' + lang] = true
  projection['bestPeriod.' + lang] = true
  projection['startEndPoint.' + lang] = true
  projection['images'] = true
  projection['priceIncludes.valueOfInc.' + lang] = true
  projection['priceExcludes.valueOfExc.' + lang] = true
  projection['pleaseNotes.valueOfNote.' + lang] = true

  return projection
}

module.exports = router
