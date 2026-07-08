const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customerId: {
            //linking
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Customer',
                                
        required: [true, 'A cart must belong to a customer'],
                               
        },
   totalPrice: {
      type: Number,
      required: [true, 'Error message if missing'],
      
    },
    items:
    [ { 
      productId: {
          //linking
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Product'                                  
      },
      
     quantity: 
     { 
        type:Number
     }
    
}
 ],
 status: {
  type: String,
   enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
  default: "Pending"
},
totalItems: {
      type: Number,
      default: 0
    }

});
module.exports = mongoose.model('Order', orderSchema  );