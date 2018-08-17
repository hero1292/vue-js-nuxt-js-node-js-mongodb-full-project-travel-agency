const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const multer = require('multer')
const fs = require('fs')
const config = require('./config')
const User = require('../../models/user-model')
const verifyToken = require('./verifyToken')

const uploads = '../src/admin/src/assets/avatars'

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

router.post('/login', (req, res) => {
  User.findOne({email: req.body.email}, (err, user) => {
    if (err) return res.status(500).send('Error on the server!')
    if (!user) return res.status(404).send('No user found!')

    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password)
    if (!passwordIsValid) return res.status(401).send({auth: false, token: null})

    const token = jwt.sign(
      {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        position: user.position,
        email: user.email,
        roles: user.roles,
        avatar: user.avatar
      },
      config.secret,
      {
        expiresIn: config.tokenLife
      })

    res.status(200).send({
      auth: true,
      token: token,
      message: 'Добро пожаловать, ' + user.firstName + ' ' + user.lastName + '!'
    })
  })
})

router.post('/logout', (req, res) => {
  res.status(200).send({auth: false, token: null})
})

router.post('/registration', upload.single('avatar'), (req, res) => {
  User.findOne({email: req.body.email}, (err, user) => {
    if (!user) {
      const hashedPassword = bcrypt.hashSync(req.body.password, 8)
      if (req.body.avatar === 'null') {
        req.body.avatar = 'default_avatar.png'
      } else {
        req.body.avatar = req.file.filename
      }

      User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        position: req.body.position,
        email: req.body.email,
        password: hashedPassword,
        roles: req.body.roles,
        avatar: req.body.avatar
      })
        .then(user => {
          res.send(user)
        })
        .catch(err => {
          if (!res.status(500)) {
            if (req.body.avatar !== 'null') {
              fs.unlink(uploads + '/' + req.file.filename, () => {
                console.log(`Avatar removed`)
              })
            }
            res.status(422).send({
              message: err.message
            })
          }
        })
    } else {
      if (req.body.avatar !== 'null') {
        fs.unlink(uploads + '/' + req.file.filename, () => {
          console.log(`Avatar removed`)
        })
      }
      return res.status(500).send('Пользователь с таким E-mail уже существует!')
    }
  })
})

router.get('/me', verifyToken, (req, res, next) => {
  User.findById(req.userId, {password: 0}, (err, user) => {
    if (err) return res.status(500).send('There was a problem finding the user.')
    if (!user) return res.status(404).send('No user found.')
    res.status(200).send(user)
  })
})

router.get('/workers', (req, res) => {
  User.find({}, 'firstName ' +
    'lastName ' +
    'position ' +
    'email ' +
    'roles ', (err, workers) => {
    if (err) {
      res.sendStatus(500)
    } else {
      res.send({workers})
    }
  }).sort({date: -1})
})

router.get('/workers/:id', (req, res) => {
  User.findById(req.params.id, 'firstName ' +
    'lastName ' +
    'position ' +
    'email ' +
    'roles ', (err, workers) => {
    if (err) {
      res.sendStatus(500)
    } else {
      res.send(workers)
    }
  })
})

router.put('/workers/:id', (req, res) => {
  User.findOne({email: req.body.email}, (err, user) => {
    if (!user || user.email === req.body.email) {
      User.update({_id: req.params.id}, {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          position: req.body.position,
          email: req.body.email,
          roles: req.body.roles
        }
      })
        .then(data => {
          res.send(data)
        })
        .catch(() => {
          return res.status(500).send('Пользователь с таким E-mail уже существует!')
        })
    }
  })
})

router.put('/workers/change_password/:id', (req, res) => {
  User.findById({_id: req.params.id}, (err, user) => {
    const passwordCheck = bcrypt.compareSync(req.body.password, user.password)
    if (!passwordCheck) {
      const hashedPassword = bcrypt.hashSync(req.body.password, 8)
      User.update({_id: req.params.id}, {
        $set: {
          password: hashedPassword
        }
      })
        .then(data => {
          res.send(data)
        })
        .catch((err) => {
          res.send(err)
        })
    } else {
      return res.status(500).send('Этот пароль уже используется, поменяйте его!')
    }
  })
})

router.delete('/workers/:id', (req, res) => {
  User.findOneAndRemove({_id: req.params.id}, (err, doc) => {
    if (err) throw err
    res.send('ok')
  })
})

module.exports = router
