/* eslint-disable standard/computed-property-even-spacing */
const express = require('express')
const router = express.Router()
const fs = require('fs')
const sight = require('../../models/sight-model')

router.post('/sights', async (req, res) => {
  const images = []
  const randName = function (name, mime) {
    return name.replace(/\./g, '_') + '_' + Math.random().toString(36).substr(2, 9) + '.' + mime
  }

  for (const image of req.body.images) {
    const mime = image.name.split('.').pop()

    if (['jpeg', 'jpg', 'png'].includes(mime)) {
      const data = image.data.replace(/^data:([A-Za-z-+\/]+);base64,/, '')
      const base = new Buffer(data, 'base64').toString('binary')
      const name = randName(image.name, mime)

      try {
        await fs.writeFileSync(`../images/sights/${name}`, base, 'binary', () => {})
        images.push(name)
      } catch (err) {
        return res.status(413).send({
          message: 'Не удалось загрузить картинки!'
        })
      }
    } else {
      return res.status(413).send({
        message: 'Не правильный формат картинки'
      })
    }
  }

  await sight.create({
    title: req.body.title,
    region: req.body.region,
    distance: req.body.distance,
    typeOfSight: req.body.typeOfSight,
    description: req.body.description,
    wayFromYerevan: req.body.wayFromYerevan,
    weather: req.body.weather,
    facts: req.body.facts,
    images
  })
    .then(data => {
      return res.status(200).send({
        message: 'Достопримечательность успешно добавлена!',
        data
      })
    })
    .catch(() => {
      unlinkImages(images).then(() => {
        return res.status(500).send({
          message: 'Произошла какая то ошибка, перезагрузите страницу и попробуйте снова!'
        })
      })
    })
})

router.get('/:lang/sights', (req, res) => {
  sight.find({}, (err, sights) => {
    if (err) {
      return res.status(500).send({
        message: err.message
      })
    } else {
      return res.status(200).send(sights)
    }
  }).select(setLang(req.params.lang)).sort({_id: -1})
})

router.get('/:lang/sights/:id', (req, res) => {
  sight.findById(req.params.id, {}, (err, sight) => {
    if (err) {
      res.sendStatus(500)
    } else {
      return res.status(200).send(sight)
    }
  }).select(setLang(req.params.lang))
})

router.get('/update/:lang/sights/:id', (req, res) => {
  sight.findById(req.params.id, {}, (err, sight) => {
    if (err) {
      return res.status(500).send({
        message: 'Произошла какая то ошибка, перезагрузите страницу и попробуйте снова!'
      })
    } else {
      return res.status(200).send(sight)
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
      res.status(200).send({
        message: 'Достопримечательность успешно изменена!',
        data
      })
    })
    .catch(() => {
      res.status(500).send({
        message: 'Произошла какая то ошибка, перезагрузите страницу и попробуйте снова!'
      })
    })
})

router.delete('/sights/:id', (req, res) => {
  sight.findOneAndRemove({_id: req.params.id}, (err, doc) => {
    if (err) {
      return res.status(500).send({
        message: 'Произошла какая то ошибка, перезагрузите страницу и попробуйте снова!'
      })
    }

    unlinkImages(doc.images).then(() => {
      return res.status(200).send({
        message: 'Достопримечательность удалена успешно!'
      })
    })
  })
})

function unlinkImages(images) {
  return new Promise((resolve, reject) => {
    for (let image of images) {
      fs.unlink(`../images/sights/${image}`, () => {
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
