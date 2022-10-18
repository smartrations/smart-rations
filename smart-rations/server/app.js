const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const cors = require('cors')
const userRoute = require('./api/routes/user')
const myRoute = require('./api/routes/my')
const columnRoute = require('./api/routes/column')
const ranchRoute = require('./api/routes/ranch')
const userfeedRoute = require('./api/routes/userfeed')
const animalRoute = require('./api/routes/animal')

const corsOptions = {
    origin: ["https://test.smartrations.com", "https://smartrations.com"],
    credentials: true,
}

app.use(cors(corsOptions))
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
app.use('/user', userRoute)
app.use('/my', myRoute)
app.use('/my', animalRoute)
app.use('/my', userfeedRoute)
app.use('/column', columnRoute)
app.use('/', ranchRoute)

module.exports = app