console.log("orderRoutes loaded");
const express = require('express');
const router = express.Router();

const { placeOrder,getCustomerOrders,getAllOrders,updateOrderStatus} = require('../controllers/orderController');

router.post('/order',placeOrder);
router.get('/order/:customerId', getCustomerOrders );
router.get('/order',getAllOrders );
router.put('/order/:orderId', updateOrderStatus);

module.exports = router;