/* eslint-disable standard/computed-property-even-spacing */
const express = require('express')
const router = express.Router()
const md5 = require('md5')
const fs = require('fs')
const incomingTour = require('../../models/incoming-tour-model')
// const outgoingTour = require('../../models/outgoing-tour-model')
// const dailyTour = require('../../models/daily-tour-model')

router.post('/:tours', async (req, res) => {
  uploadImages(req.body.images, req.params.tours)
    .then((images) => {
      return
    })
    .catch(() => {
      return res.status(413).send('cannot save image')
    })

  await incomingTour.create({
    typesOfTour: req.body.typesOfTour,
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
  })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      unlinkImages(images).then(() => {
        res.status(422).send({
          message: err.message
        })
      })
    })
})

router.get('/:lang/:tours', (req, res) => {
  let tours = incomingTour.find()
  if (req.query.type) {
    tours.where('typesOfTour', req.query.type)
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

router.get('/:lang/:tours/:id', (req, res) => {
  incomingTour.findById(req.params.id, {}, (err, tour) => {
    if (err) {
      res.sendStatus(500)
    } else {
      res.send(tour)
    }
  }).select(setLang(req.params.lang))
})

router.get('/:tours/:id', (req, res) => {
  incomingTour.findById(req.params.id, {}, (err, tour) => {
    if (err) {
      res.sendStatus(500)
    } else {
      res.send(tour)
    }
  })
})

router.put('/:tours/:id', (req, res) => {
  incomingTour.update({_id: req.params.id}, {
    $set: {
      typesOfTour: req.body.typesOfTour,
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

router.delete('/:lang/:tours/:id', (req, res) => {
  incomingTour.findOneAndRemove({_id: req.params.id}, (err, doc) => {
    if (err) throw err

    unlinkImages(doc.images).then(() => {
      res.send('ok')
    })
  })
})

function uploadImages(files, dir) {
  return new Promise((resolve, reject) => {
    const images = []
    for (const file of files) {
      const mime = file.name.split('.').pop()

      if (['jpeg', 'jpg', 'png'].includes(mime)) {
        const data = file.data.replace(/^data:([A-Za-z-+\/]+);base64,/, '')
        const base = new Buffer(data, 'base64').toString('binary')
        const name = md5(file.data) + '.' + mime

        fs.writeFile(`../images/${dir}/${name}`, base, 'binary', () => {
        })
        images.push(name)
      } else {
        reject(new Error('wrong image format'))
      }
      resolve(images)
    }
  })
}

function unlinkImages(images) {
  return new Promise((resolve, reject) => {
    for (let image of images) {
      fs.unlink(`../images/incoming_tours/${image}`, () => {
        console.log(`Image "${image}" removed`)
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
  projection['typesOfTour'] = true
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
