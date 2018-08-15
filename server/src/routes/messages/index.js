/* eslint-disable standard/computed-property-even-spacing */
const express = require('express')
const router = express.Router()
const message = require('../../models/message-model')
const transporter = require('../../mail')

router.post('/messages', (req, res) => {
  message.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    email: req.body.email,
    description: req.body.description
  })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.send(err)
    })

  let mailOptions = {
    from: '<pogosyanmayis07@gmail.com>',
    to: 'pogosyanmayis07@gmail.com',
    subject: 'Новое сообщение',
    html: `
    <h2>Вам новое сообщение</h2>
    <h3>Детали сообщения:</h3>
    <ul>  
      <li>Имя: ${req.body.firstName}</li>
      <li>Фамилия: ${req.body.lastName}</li>
      <li>Телефон: ${req.body.phone}</li>
      <li>Email: ${req.body.email}</li>
    </ul>
    <h3>Сообщение</h3>
    <p>${req.body.description}</p>
  `
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error)
    }
    console.log('Message sent: %s', info.messageId)
  })
})

router.get('/messages', (req, res) => {
  message.find({}, 'date ' +
    'firstName ' +
    'lastName ' +
    'phone ' +
    'email ' +
    'description ', (err, messages) => {
    if (err) {
      res.sendStatus(500)
    } else {
      res.send({messages: messages})
    }
  }).sort({_id: -1})
})

router.delete('/messages/:id', (req, res) => {
  message.remove({ _id: req.params.id }, err => {
    if (err) {
      res.sendStatus(500)
    } else {
      res.sendStatus(200)
    }
  })
})

module.exports = router
