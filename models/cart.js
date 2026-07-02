const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    customerId: {
        //linking
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Customer',
                            
    required: [true, 'A cart must belong to a customer'],
    unique: true                          
    },
   totalPrice: {
    type: Number,
    required: [true, 'Error message if missing'],
    
  },
  items:
  [
    {
   quantity: { type:Number,
    default: 1
   },
  

    productId: {
        //linking
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product',
                                       
    },
  }

],
totalItems: {
    type: Number,
    default: 0
}
});

module.exports = mongoose.model('Cart',  cartSchema );