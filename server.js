var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var app = express()
const mongoose = require('mongoose')
var port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: false
  })
) 

const mongoURI = 'mongodb://localhost:27017/db'

mongoose
  .connect(
    mongoURI,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))

var Users = require('./routes/Users')
var Brokers = require('./routes/Broker')
var Stocks = require('./routes/Stock')

app.use('/users', Users)
app.use('/brokers', Brokers)
app.use('/stocks', Stocks)

app.listen(port, function() {
  console.log('Server is running on port: ' + port)
})
