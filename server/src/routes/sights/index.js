/* eslint-disable standard/computed-property-even-spacing */
const express = require('express')
const router = express.Router()
const multer = require('multer')
const fs = require('fs')
const sight = require('../../models/sight-model')

const uploads = '../src/client/static/img/sights'

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

router.post('/sights', upload.fields([{
  name: 'files[]',
  maxCount: 15
}]), (req, res) => {
  sight.create({
    title: req.body.title,
    region: req.body.region,
    distance: req.body.distance,
    typeOfSight: req.body.typeOfSight,
    description: req.body.description,
    images: req.body.images,
    wayFromYerevan: req.body.wayFromYerevan,
    weather: req.body.weather,
    facts: req.body.facts
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

router.get('/:lang/sights', (req, res) => {
  sight.find({}, (err, sights) => {
    if (err) {
      return res.status(400).send({
        message: err
      })
    } else {
      res.json(sights)
    }
  }).select(setLang(req.params.lang)).sort({_id: -1})
})

router.get('/:lang/sights/:id', (req, res) => {
  sight.findById(req.params.id, 'title ' +
    'region ' +
    'distance ' +
    'typeOfSight ' +
    'description ' +
    'images ' +
    'wayFromYerevan ' +
    'weather ' +
    'facts', (err, sight) => {
    if (err) {
      res.sendStatus(500)
    } else {
      res.send(sight)
    }
  }).select(setLang(req.params.lang))
})

router.get('/sights/:id', (req, res) => {
  sight.findById(req.params.id, 'title ' +
    'region ' +
    'distance ' +
    'typeOfSight ' +
    'description ' +
    'images ' +
    'wayFromYerevan ' +
    'weather ' +
    'facts', (err, sight) => {
    if (err) {
      res.sendStatus(500)
    } else {
      res.send(sight)
    }
  })
})

router.put('/sights/:id', (req, res) => {
  sight.update({_id: req.params.id}, {
    $set: {
      title: req.body.title,
      region: req.body.region,
      distance: req.body.distance,
      typeOfSight: req.body.typeOfSight,
      description: req.body.description,
      wayFromYerevan: req.body.wayFromYerevan,
      weather: req.body.weather,
      facts: req.body.facts
    }
  })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send(err)
    })
})

router.delete('/:lang/sights/:id', (req, res) => {
  sight.findOneAndRemove({_id: req.params.id}, (err, doc) => {
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
  projection['region.' + lang] = true
  projection['distance'] = true
  projection['typeOfSight.' + lang] = true
  projection['description.' + lang] = true
  projection['images'] = true
  projection['wayFromYerevan.' + lang] = true
  projection['weather.' + lang] = true
  projection['facts.text.' + lang] = true

  return projection
}

module.exports = router
