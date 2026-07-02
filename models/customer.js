const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Error message if missing'],
    
  },
   password: {
    type: String,
    required: [true, 'Error message if missing'],
    
  }
});
module.exports = mongoose.model('Customer', customerSchema );