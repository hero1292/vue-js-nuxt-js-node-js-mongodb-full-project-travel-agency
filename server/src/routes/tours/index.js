/* eslint-disable standard/computed-property-even-spacing */
const express = require('express')
const router = express.Router()
const fs = require('fs')
const incomingTour = require('../../models/incoming-tour-model')
const outgoingTour = require('../../models/outgoing-tour-model')
const dailyTour = require('../../models/daily-tour-model')

router.post('/:tours', async (req, res) => {
  let images = []
  await uploadImages(req.body.images)
    .then((files) => {
      images = files
    })
    .catch((err) => {
      return res.status(413).send({
        message: err.message
      })
    })

  if (req.params.tours === 'incoming_tours') {
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
      pleaseNotes: req.body.pleaseNotes,
      images
    })
      .then(data => {
        return res.status(200).send({
          message: 'Въездной тур успешно добавлен!',
          data
        })
      })
      .catch(err => {
        unlinkImages(images).then(() => {
          return res.status(422).send({
            message: err.message
          })
        })
      })
  } else if (req.params.tours === 'outgoing_tours') {
    await outgoingTour.create({
      title: req.body.title,
      country: req.body.country,
      daysAndNights: req.body.daysAndNights,
      prices: req.body.prices,
      description: req.body.description,
      groupSize: req.body.groupSize,
      accommodation: req.body.accommodation,
      bestPeriod: req.body.bestPeriod,
      startEndPoint: req.body.startEndPoint,
      priceIncludes: req.body.priceIncludes,
      priceExcludes: req.body.priceExcludes,
      pleaseNotes: req.body.pleaseNotes,
      images
    })
      .then(data => {
        return res.status(200).send({
          message: 'Выездной тур успешно добавлен!',
          data
        })
      })
      .catch(err => {
        unlinkImages(images).then(() => {
          return res.status(422).send({
            message: err.message
          })
        })
      })
  } else if (req.params.tours === 'daily_tours') {
    await dailyTour.create({
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
      pleaseNotes: req.body.pleaseNotes,
      images
    })
      .then(data => {
        return res.status(200).send({
          message: 'Ежедневный тур успешно добавлен!',
          data
        })
      })
      .catch(err => {
        unlinkImages(images).then(() => {
          return res.status(422).send({
            message: err.message
          })
        })
      })
  }
})

router.get('/:lang/:tours', async (req, res) => {
  if (req.params.tours === 'incoming_tours') {
    await fetchTours(incomingTour, req.query.type, 'typesOfTour', req.params.lang)
      .then((tours) => {
        return res.status(200).send(tours)
      })
      .catch((err) => {
        return res.status(500).send({
          message: err.message
        })
      })
  } else if (req.params.tours === 'outgoing_tours') {
    await outgoingTour.find({}, (err, tours) => {
      if (err) {
        return res.status(500).send({
          message: err.message
        })
      } else {
        return res.status(200).send(tours)
      }
    }).select(setLang(req.params.lang)).sort({_id: -1})
  } else if (req.params.tours === 'daily_tours') {
    await fetchTours(dailyTour, req.query.type, 'date', req.params.lang)
      .then((tours) => {
        return res.status(200).send(tours)
      })
      .catch((err) => {
        return res.status(500).send({
          message: err.message
        })
      })
  }
})

router.get('/:lang/:tours/:id', async (req, res) => {
  if (req.params.tours === 'incoming_tours') {
    await getTour(incomingTour, req.params.id, req.params.lang)
      .then((tour) => {
        return res.status(200).send(tour)
      })
      .catch((err) => {
        return res.status(500).send({
          message: err.message
        })
      })
  } else if (req.params.tours === 'outgoing_tours') {
    await getTour(outgoingTour, req.params.id, req.params.lang)
      .then((tour) => {
        return res.status(200).send(tour)
      })
      .catch((err) => {
        return res.status(500).send({
          message: err.message
        })
      })
  } else if (req.params.tours === 'daily_tours') {
    await getTour(dailyTour, req.params.id, req.params.lang)
      .then((tour) => {
        return res.status(200).send(tour)
      })
      .catch((err) => {
        return res.status(500).send({
          message: err.message
        })
      })
  }
})

router.get('/update/:lang/:tours/:id', async (req, res) => {
  if (req.params.tours === 'incoming_tours') {
    await getTourForUpdate(incomingTour, req.params.id)
      .then((tour) => {
        return res.status(200).send(tour)
      })
      .catch((err) => {
        return res.status(500).send({
          message: err.message
        })
      })
  } else if (req.params.tours === 'outgoing_tours') {
    await getTourForUpdate(outgoingTour, req.params.id)
      .then((tour) => {
        return res.status(200).send(tour)
      })
      .catch((err) => {
        return res.status(500).send({
          message: err.message
        })
      })
  } else if (req.params.tours === 'daily_tours') {
    await getTourForUpdate(dailyTour, req.params.id)
      .then((tour) => {
        return res.status(200).send(tour)
      })
      .catch((err) => {
        return res.status(500).send({
          message: err.message
        })
      })
  }
})

router.put('/:tours/:id', async (req, res) => {
  if (req.params.tours === 'incoming_tours') {
    await incomingTour.update({_id: req.params.id}, {
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
        return res.status(200).send({
          message: 'Въездной тур успешно изменен!',
          data
        })
      })
      .catch(err => {
        return res.status(500).send({
          message: 'Произошла какая то ошибка, перезагрузите страницу и попробуйте снова!'
        })
      })
  } else if (req.params.tours === 'outgoing_tours') {
    await outgoingTour.update({_id: req.params.id}, {
      $set: {
        title: req.body.title,
        country: req.body.country,
        daysAndNights: req.body.daysAndNights,
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
        return res.status(200).send({
          message: 'Выездной тур успешно изменен!',
          data
        })
      })
      .catch(err => {
        return res.status(500).send({
          message: 'Произошла какая то ошибка, перезагрузите страницу и попробуйте снова!'
        })
      })
  } else if (req.params.tours === 'daily_tours') {
    await dailyTour.update({_id: req.params.id}, {
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
        return res.status(200).send({
          message: 'Ежедневный тур успешно изменен!',
          data
        })
      })
      .catch(err => {
        return res.status(500).send({
          message: 'Произошла какая то ошибка, перезагрузите страницу и попробуйте снова!'
        })
      })
  }
})

router.delete('/:tours/:id', async (req, res) => {
  if (req.params.tours === 'incoming_tours') {
    await deleteTour(incomingTour, req.params.id)
      .then((resolve) => {
        return res.status(200).send({message: resolve})
      })
      .catch((err) => {
        return res.status(500).send({
          message: err.message
        })
      })
  } else if (req.params.tours === 'outgoing_tours') {
    await deleteTour(outgoingTour, req.params.id)
      .then((resolve) => {
        return res.status(200).send({message: resolve})
      })
      .catch((err) => {
        return res.status(500).send({
          message: err.message
        })
      })
  } else if (req.params.tours === 'daily_tours') {
    await deleteTour(dailyTour, req.params.id)
      .then((resolve) => {
        return res.status(200).send({message: resolve})
      })
      .catch((err) => {
        return res.status(500).send({
          message: err.message
        })
      })
  }
})

function uploadImages(files) {
  return new Promise((resolve, reject) => {
    const images = []
    const randName = function (name, mime) {
      return name.replace(/\./g, '_') + '_' + Math.random().toString(36).substr(2, 9) + '.' + mime
    }

    for (const file of files) {
      const mime = file.name.split('.').pop()

      if (['jpeg', 'jpg', 'png'].includes(mime)) {
        const data = file.data.replace(/^data:([A-Za-z-+\/]+);base64,/, '')
        const base = new Buffer(data, 'base64').toString('binary')
        const name = randName(file.name, mime)

        try {
          fs.writeFile(`../images/tours/${name}`, base, 'binary', () => {
          })
          images.push(name)
        } catch (err) {
          reject(new Error('Не удалось загрузить картинки!'))
        }
      } else {
        reject(new Error('Не правильный формат картинки!'))
      }
      resolve(images)
    }
  })
}

function fetchTours(toursParam, query, type, lang) {
  return new Promise((resolve, reject) => {
    let tours = toursParam.find()
    if (query) {
      tours.where(type, query)
    }
    tours.select(setLang(lang))
      .sort({_id: -1})
      .exec((err, tours) => {
        if (err) {
          reject(err)
        } else {
          resolve(tours)
        }
      })
  })
}

function getTour(toursParam, id, lang) {
  return new Promise((resolve, reject) => {
    toursParam.findById(id, {}, (err, tour) => {
      if (err) {
        reject(err)
      } else {
        resolve(tour)
      }
    }).select(setLang(lang))
  })
}

function getTourForUpdate(toursParam, id) {
  return new Promise((resolve, reject) => {
    toursParam.findById(id, {}, (err, tour) => {
      if (err) {
        reject(new Error('Произошла какая то ошибка, перезагрузите страницу и попробуйте снова!'))
      } else {
        resolve(tour)
      }
    })
  })
}

function deleteTour(toursParam, id) {
  return new Promise((resolve, reject) => {
    toursParam.findOneAndRemove({_id: id}, (err, doc) => {
      if (err) reject(err)

      unlinkImages(doc.images).then(() => {
        resolve('Тур удален успешно!')
      })
    })
  })
}

function unlinkImages(images) {
  return new Promise((resolve, reject) => {
    for (let image of images) {
      fs.unlink(`../images/tours/${image}`, () => {
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
  projection['date'] = true
  projection['repeat.' + lang] = true
  projection['start'] = true
  projection['end'] = true
  projection['typesOfDailyTour.' + lang] = true
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
