console.log("productRoutes loaded");
const express = require('express');
const router = express.Router();

const { addProduct,getAllProducts,updateProduct,deleteProduct } = require('../controllers/productController');

router.post('/product', addProduct);
router.get('/product', getAllProducts);
router.put('/product/:id', updateProduct);
router.delete('/product/:id', deleteProduct);



module.exports = router;