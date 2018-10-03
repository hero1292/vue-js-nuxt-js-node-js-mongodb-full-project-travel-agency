const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'pogosyanmayis07@gmail.com',
    pass: '094130565'
  },
  tls: {
    rejectUnauthorized: false
  }
})

module.exports = transporter
