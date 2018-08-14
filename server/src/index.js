const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const config = require('./config')
mongoose.Promise = global.Promise

const app = express()
app.use(morgan('combined'))
app.use(express.json())
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
app.use(cors())

app.use('/api/auth', require('./routes/auth'))
app.use(require('./routes/incoming_tours'))
app.use(require('./routes/outgoing_tours'))
app.use(require('./routes/daily_tours'))

mongoose.connect(config.dbURL, config.urlParser)
mongoose.connection
  .once('open', () => {
    console.log(`Mongoose - successful connection ...`)
    app.listen(process.env.PORT || config.port, () => console.log(`Server start on port ${config.port} ...`))
  })
  .on('error', error => console.warn(error))
