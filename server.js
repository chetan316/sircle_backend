const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

const routes = require('./routes')
const config = require('./config')
const HttpException = require('./utils/httpexception.utils')
const errorMiddleware = require('./middlewares/error.middleware')

const app = express()

app.use(helmet())
// parse requests of content-type: application/json
// parses incoming requests with JSON payloads
app.use(express.json())
app.use(cors())
// Enable pre-flight
app.options('*', cors())

app.use('/', routes)

// 404 error
app.all('*', (req, res, next) => {
    const err = new HttpException(404, 'Endpoint Not Found')
    next(err)
})

// Error middleware
app.use(errorMiddleware)

app.listen(config.port, () => {
    console.log(`Server started at ${config.port}`)
})

module.exports = app
