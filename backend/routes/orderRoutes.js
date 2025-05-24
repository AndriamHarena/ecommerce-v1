// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/authMiddleware');
const orderController = require('../controllers/orderController');

router.post('/create', isAuthenticated, orderController.createOrder);
router.get('/my-orders', isAuthenticated, orderController.getUserOrders);

module.exports = router;
