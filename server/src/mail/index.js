const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'pogosyanmayis07@gmail.com',
    pass: '094130565'
  },
  tls: {
    rejectUnauthorized: false
  }
})

module.exports = transporter
