
const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const isAdmin = require('../middleware/isAdmin');


const { addProduct,getAllProducts,getProductById,updateProduct,deleteProduct } = require('../controllers/productController');

const upload = require('../middleware/upload');
router.post('/product', verifyToken,isAdmin, upload.single('image'), addProduct);
router.get('/product', getAllProducts);
router.get('/product/:id', getProductById);
router.put('/product/:id',verifyToken,isAdmin, upload.single('image'), updateProduct);
router.delete('/product/:id',verifyToken,isAdmin, deleteProduct);



module.exports = router;