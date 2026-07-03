console.log("authRoutes loaded");
const express = require('express');
const router = express.Router();

const { registerCustomer, loginCustomer, loginAdmin } = require('../controllers/authController');

router.post('/customer/register', registerCustomer);
router.post('/customer/login', loginCustomer);
router.post('/admin/login', loginAdmin);



module.exports = router;