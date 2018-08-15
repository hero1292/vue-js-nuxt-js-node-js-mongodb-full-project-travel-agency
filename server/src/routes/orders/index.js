/* eslint-disable standard/computed-property-even-spacing */
const express = require('express')
const router = express.Router()
const order = require('../../models/order-model')
const transporter = require('../../mail')

router.post('/orders', (req, res) => {
  order.create({
    title: req.body.title,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    city: req.body.city,
    country: req.body.country,
    phone: req.body.phone,
    email: req.body.email,
    adults: req.body.adults,
    children: req.body.children,
    dateOfArrival: req.body.dateOfArrival,
    departureDate: req.body.departureDate,
    description: req.body.description
  })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.send(err)
    })

  let mailOptions = {
    from: '"Nice Tour" <pogosyanmayis07@gmail.com>',
    to: 'pogosyanmayis07@gmail.com',
    subject: 'Новый заказ',
    html: `
    <h2>Новый Заказ</h2>
    <h3>Детали заказа:</h3>
    <ul>  
      <li>Название тура: ${req.body.title}</li>
      <li>Имя: ${req.body.firstName}</li>
      <li>Фамилия: ${req.body.lastName}</li>
      <li>Город: ${req.body.city}</li>
      <li>Страна: ${req.body.country}</li>
      <li>Телефон: ${req.body.phone}</li>
      <li>Email: ${req.body.email}</li>
      <li>Взрослые: ${req.body.adults}</li>
      <li>Дети: ${req.body.children}</li>
      <li>Дата приезда: ${req.body.dateOfArrival}</li>
      <li>Дата отъезда: ${req.body.departureDate}</li>
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

router.get('/orders', (req, res) => {
  order.find({}, 'date ' +
    'title ' +
    'firstName ' +
    'lastName ' +
    'city ' +
    'country ' +
    'phone ' +
    'email ' +
    'adults ' +
    'children ' +
    'dateOfArrival ' +
    'departureDate ' +
    'description ', (err, orders) => {
    if (err) {
      res.sendStatus(500)
    } else {
      res.send({orders: orders})
    }
  }).sort({date: -1})
})

router.delete('/orders/:id', (req, res) => {
  order.remove({ _id: req.params.id }, err => {
    if (err) {
      res.sendStatus(500)
    } else {
      res.sendStatus(200)
    }
  })
})

module.exports = router
