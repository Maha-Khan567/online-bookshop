
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Error message if missing'],
    
  },
   password: {
    type: String,
    required: [true, 'Error message if missing'],
    
  }
});
module.exports = mongoose.model('Admin', adminSchema );
