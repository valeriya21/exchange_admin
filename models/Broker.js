const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const BrokerSchema = new Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String
  },
  balance: {
    type: Number,
    required: true
  }
})

module.exports = Broker = mongoose.model('brokers', BrokerSchema)