
const express = require('express');
const router = express.Router();

const { addToCart, getCart,removeFromCart,clearCart} = require('../controllers/cartController');

router.post('/cart',addToCart );
router.get('/cart/:customerId',  getCart);
router.delete('/cart/:customerId/:productId',removeFromCart );
router.delete('/cart/:customerId',clearCart );

module.exports = router;