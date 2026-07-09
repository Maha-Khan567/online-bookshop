const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Error message if missing'],
    
  },
   stock: {
    type: Number,
    required: [true, 'Error message if missing'],
    
  }, description: {
    type: String,
  },
   price: {
    type: Number,
    required: [true, 'Error message if missing'],
    
  },
  image: {
    type: String
}
});
module.exports = mongoose.model('Product', productSchema );