/* eslint-disable standard/computed-property-even-spacing */
const express = require('express')
const router = express.Router()
const multer = require('multer')
const fs = require('fs')
const tour = require('../../models/incoming-tour-model')

const uploads = '../src/client/static/img/tours'

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

router.post('/incoming-tours', upload.fields([{
  name: 'files[]',
  maxCount: 15
}]), (req, res) => {
  // req.files['files[]'].map(image => {
  //   console.log(image)
  // })
  console.log(req)
  // req.body.images = req.files['files[]'] ? req.files['files[]'].map(image => (image.path.split('\\').pop())) : []
  // req.body.tour = JSON.parse(req.body.tour)
  // console.log(req.body.tour)
  // req.body.priceIncludes = JSON.parse(req.body.priceIncludes)
  // req.body.priceExcludes = JSON.parse(req.body.priceExcludes)
  // req.body.pleaseNotes = JSON.parse(req.body.pleaseNotes)
  tour.create({
    typesOfTour: req.body.typesOfTour,
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

router.get('/', (req, res) => {
  let tours = tour.find()
  if (req.query.type) {
    tours.where('typesOfTour', req.query.type)
  }

  tours.exec((err, docs) => {
    if (err) {
      throw err
    }
    res.send(docs)
  })
})

router.get('/:id', (req, res) => {
  tour.findById(req.params.id, 'typesOfTour ' +
    'title ' +
    'country ' +
    'days ' +
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

router.put('/:id', (req, res) => {
  tour.findById(req.params.id, 'typesOfTour ' +
    'title ' +
    'country ' +
    'days ' +
    'prices ' +
    'description ' +
    'groupSize ' +
    'accommodation ' +
    'bestPeriod ' +
    'startEndPoint ' +
    'arrayOfDays ' +
    'priceIncludes ' +
    'priceExcludes ' +
    'pleaseNotes', (err, tour) => {
    if (err) {
      console.log(err)
    } else {
      if (req.body.typesOfTour) {
        tour.typesOfTour = req.body.typesOfTour
      }
      if (req.body.title) {
        tour.title = req.body.title
      }
      if (req.body.country) {
        tour.country = req.body.country
      }
      if (req.body.days) {
        tour.days = req.body.days
      }
      if (req.body.prices) {
        tour.prices = req.body.prices
      }
      if (req.body.description) {
        tour.description = req.body.description
      }
      if (req.body.groupSize) {
        tour.groupSize = req.body.groupSize
      }
      if (req.body.accommodation) {
        tour.accommodation = req.body.accommodation
      }
      if (req.body.bestPeriod) {
        tour.bestPeriod = req.body.bestPeriod
      }
      if (req.body.startEndPoint) {
        tour.startEndPoint = req.body.startEndPoint
      }
      if (req.body.arrayOfDays) {
        tour.arrayOfDays = req.body.arrayOfDays
      }
      if (req.body.priceIncludes) {
        tour.priceIncludes = req.body.priceIncludes
      }
      if (req.body.priceExcludes) {
        tour.priceExcludes = req.body.priceExcludes
      }
      if (req.body.pleaseNotes) {
        tour.pleaseNotes = req.body.pleaseNotes
      }
      tour.save(err => {
        if (err) {
          res.sendStatus(500)
        } else {
          res.sendStatus(200)
        }
      })
    }
  })
})

router.delete('/:id', (req, res) => {
  tour.findOneAndRemove({_id: req.params.id}, (err, doc) => {
    if (err) throw err

    unlinkImages(doc.images).then(() => {
      res.send('ok')
    })
  })
})

function unlinkImages (images) {
  return new Promise((resolve, reject) => {
    for (let file of images) {
      fs.unlink(uploads + '/' + file, () => {
        console.log(`File "${file}" removed`)
      })

      resolve()
    }
  })
}

module.exports = router

// router.get('/:lang/articles', (req, res) => {
//   article.find().select(setLang(req.params.lang)).sort('-date').exec((err, articles) => {
//     if (err) {
//       return res.status(400).send({
//         message: err
//       })
//     } else {
//       res.json(articles)
//     }
//   })
// })
//
// router.get('/:lang/articles/:id', (req, res) => {
//   article.findById(req.params.id).select(setLang(req.params.lang)).exec((err, article) => {
//     if (err) {
//       return res.status(400).send({
//         message: err
//       })
//     } else {
//       res.json(article)
//     }
//   })
// })
//
// router.put('/:lang/articles/:id', (req, res) => {
//   article.findById(req.params.id).select(setLang(req.params.lang)).exec((err, article) => {
//     if (err) {
//       console.log(err)
//     } else {
//       if (req.body.title) {
//         article.title = req.body.title
//       }
//       if (req.body.content) {
//         article.content = req.body.content
//       }
//       article.save(err => {
//         if (err) {
//           res.sendStatus(500)
//         } else {
//           res.sendStatus(200)
//         }
//       })
//     }
//   })
// })
//
// router.delete('/articles/:id', (req, res) => {
//   article.findOneAndRemove({_id: req.params.id}, (err, doc) => {
//     if (err) {
//       throw err
//     } else {
//       res.send('Ok')
//     }
//   })
// })
//
// function setLang(param) {
//   const params = param
//   let lang
//   if (params === 'en') {
//     lang = 'en'
//   } else if (params === 'it') {
//     lang = 'it'
//   } else if (params === 'fr') {
//     lang = 'fr'
//   } else {
//     res.redirect('/')
//   }
//   let projection = {'date': true}
//   projection['title.' + lang] = true
//   projection['content.' + lang] = true
//   return projection
// }