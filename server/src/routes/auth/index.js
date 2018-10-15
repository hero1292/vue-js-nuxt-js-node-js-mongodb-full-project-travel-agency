const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const fs = require('fs')
const config = require('./config')
const User = require('../../models/user-model')
const verifyToken = require('./verifyToken')

router.post('/login', (req, res) => {
  User.findOne({email: req.body.email}, (err, user) => {
    if (err) {
      res.status(500).send({
        message: 'Произошла какая то ошибка, перезагрузите страницу и попробуйте снова!'
      })
    }
    if (!user) {
      res.status(404).send({
        message: 'Неверный логин или пароль!'
      })
    }

    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password)
    if (!passwordIsValid) return res.status(404).send({
      message: 'Неверный логин или пароль!',
      auth: false,
      token: null
    })

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
  res.status(200).send({
    auth: false,
    token: null
  })
})

router.post('/registration', async (req, res) => {
  let avatar = req.body.avatar
  const randName = function (name, mime) {
    return 'avatar_' + Math.random().toString(36).substr(2, 9) + '.' + mime
  }

  if (avatar !== null) {
    const mime = avatar.split(';').shift().split('/').pop()

    if (['jpeg', 'jpg', 'png'].includes(mime)) {
      const data = avatar.replace(/^data:([A-Za-z-+\/]+);base64,/, '')
      const base = new Buffer(data, 'base64').toString('binary')
      const name = randName(avatar, mime)

      try {
        await fs.writeFileSync(`../images/avatars/${name}`, base, 'binary', () => {
        })
        avatar = name
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
          return res.status(200).send({
            message: 'Пользователь успешно зарегистрирован!', user
          })
        })
        .catch(() => {
          if (!res.status(500)) {
            if (avatar !== 'default_avatar.png') {
              unlinkAvatar(avatar).then(() => {
                return res.status(500).send({
                  message: 'Произошла какая то ошибка, перезагрузите страницу и попробуйте снова!'
                })
              })
            }
          }
        })
    } else {
      if (avatar !== 'default_avatar.png') {
        unlinkAvatar(avatar).then(() => {
          return res.status(500).send({
            message: 'Произошла какая то ошибка, перезагрузите страницу и попробуйте снова!'
          })
        })
      }
      return res.status(500).send({
        message: 'Пользователь с таким E-mail уже существует!'
      })
    }
  })
})

router.get('/me', verifyToken, (req, res, next) => {
  User.findById(req.userId, {password: 0}, (err, user) => {
    if (err) {
      return res.status(500).send({
        message: 'Не удалось найти пользователя!'
      })
    }
    if (!user) {
      return res.status(500).send({
        message: 'Пользователь не найден!'
      })
    }
    return res.status(200).send(user)
  })
})

router.get('/workers', (req, res) => {
  User.find({}, 'firstName ' +
    'lastName ' +
    'position ' +
    'email ' +
    'roles ', (err, workers) => {
    if (err) {
      return res.status(500).send({
        message: 'Произошла какая то ошибка, перезагрузите страницу и попробуйте снова!'
      })
    } else {
      return res.status(200).send(workers)
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
      return res.status(500).send({
        message: 'Произошла какая то ошибка, перезагрузите страницу и попробуйте снова!'
      })
    } else {
      return res.status(200).send(workers)
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
          return res.status(200).send({
            message: 'Пользователь изменен успешно!',
            data
          })
        })
        .catch(() => {
          return res.status(500).send({
            message: 'Пользователь с таким E-mail уже существует!'
          })
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
          return res.status(200).send({
            message: 'Пароль успешно изменен!',
            data
          })
        })
        .catch(() => {
          return res.status(500).send({
            message: 'Не удалось поменять пароль!'
          })
        })
    } else {
      return res.status(500).send({
        message: 'Этот пароль уже используется, поменяйте его!'
      })
    }
  })
})

router.delete('/workers/:id', (req, res) => {
  User.findOneAndRemove({_id: req.params.id}, (err, doc) => {
    if (err) {
      return res.status(500).send({
        message: 'Произошла какая то ошибка, перезагрузите страницу и попробуйте снова!'
      })
    }

    unlinkAvatar(doc.avatar).then(() => {
      return res.status(200).send({
        message: 'Пользователь удален успешно!'
      })
    })
  })
})

function unlinkAvatar(avatar) {
  return new Promise((resolve, reject) => {
    if (avatar !== 'default_avatar.png') {
      fs.unlink(`../images/avatars/${avatar}`, () => {
        console.log(`Image "${avatar}" removed`)
      })
    }

    resolve()
  })
}

module.exports = router
