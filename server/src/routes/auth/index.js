const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const md5 = require('md5')
const fs = require('fs')
const config = require('./config')
const User = require('../../models/user-model')
const verifyToken = require('./verifyToken')

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

router.post('/registration', async (req, res) => {
  let avatar = req.body.avatar

  if (avatar !== null) {
    const mime = avatar.split(';').shift().split('/').pop()

    if (['jpeg', 'jpg', 'png'].includes(mime)) {
      const data = avatar.replace(/^data:([A-Za-z-+\/]+);base64,/, '')
      const base = new Buffer(data, 'base64').toString('binary')
      const name = md5(avatar) + '.' + mime

      try {
        await fs.writeFileSync(`../images/avatars/${name}`, base, 'binary', () => {})
        avatar = name
      } catch (err) {
        return res.status(413).send('Не возможно сохранить изображение!')
      }
    } else {
      return res.status(413).send('Не правильный формат изображения!')
    }
  } else {
    avatar = 'default_avatar.png'
  }


  User.findOne({email: req.body.email}, (err, user) => {
    if (!user) {
      const hashedPassword = bcrypt.hashSync(req.body.password, 8)

      User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        position: req.body.position,
        email: req.body.email,
        password: hashedPassword,
        roles: req.body.roles,
        avatar
      })
        .then(user => {
          res.send(user)
        })
        .catch(err => {
          if (!res.status(500)) {
            if (avatar !== 'default_avatar.png') {
              unlinkAvatar(avatar).then(() => {
                res.status(422).send({
                  message: err.message
                })
              })
            }
          }
        })
    } else {
      if (avatar !== 'default_avatar.png') {
        unlinkAvatar(avatar).then(() => {})
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

    unlinkAvatar(doc.avatar).then(() => {
      res.send('ok')
    })
  })
})

function unlinkAvatar(avatar) {
  return new Promise((resolve, reject) => {
      fs.unlink(`../images/avatars/${avatar}`, () => {
        console.log(`Image "${avatar}" removed`)
      })

      resolve()
  })
}

module.exports = router
