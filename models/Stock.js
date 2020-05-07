const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

// Create Schema
const StockSchema = new Schema({
  name: {
    type: String,
    required: true
  }, 
  distribution_law : {
    type: String,
    required: true
  },
  start_price: {
    type: Number,
    required: true
  }
})

module.exports = Stock = mongoose.model('stocks', StockSchema)