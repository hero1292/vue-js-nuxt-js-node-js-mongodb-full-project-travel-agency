/* eslint-disable standard/computed-property-even-spacing */
const express = require('express')
const router = express.Router()
const multer = require('multer')
const fs = require('fs')
const socPackage = require('../../models/soc-package-model')

const uploads = '../src/client/static/img/soc_packages'

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

router.post('/soc_packages', upload.fields([{
  name: 'files[]',
  maxCount: 15
}]), (req, res) => {
  socPackage.create({
    resort: req.body.resort,
    title: req.body.title,
    tables: req.body.tables,
    description: req.body.description,
    arrival: req.body.arrival,
    departure: req.body.departure,
    socPackages: req.body.socPackages,
    images: req.body.images
  })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.send(err)
    })
})

router.get('/soc_packages', (req, res) => {
  let socPackages = socPackage.find()
  if (req.query.type) {
    socPackages.where('resort', req.query.type)
  }

  socPackages.exec((err, docs) => {
    if (err) {
      throw err
    }
    res.send(docs)
  })
})

router.get('/soc_packages/:id', (req, res) => {
  socPackage.findById(req.params.id, 'resort ' +
    'title ' +
    'tables ' +
    'description ' +
    'arrival ' +
    'departure ' +
    'socPackages', (err, hotels) => {
    if (err) {
      res.sendStatus(500)
    } else {
      res.send(hotels)
    }
  })
})

router.put('/soc_packages/:id', (req, res) => {
  socPackage.update({_id: req.params.id}, {
    $set: {
      resort: req.body.resort,
      title: req.body.title,
      tables: req.body.tables,
      description: req.body.description,
      arrival: req.body.arrival,
      departure: req.body.departure,
      socPackages: req.body.socPackages
    }
  })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send(err)
    })
})

router.delete('/soc_packages/:id', (req, res) => {
  socPackage.findOneAndRemove({_id: req.params.id}, (err, doc) => {
    if (err) throw err
      res.send('ok')
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
