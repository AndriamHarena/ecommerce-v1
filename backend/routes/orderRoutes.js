// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/authMiddleware');
const orderController = require('../controllers/orderController');

router.post('/', isAuthenticated, orderController.createOrder);
router.get('/', isAuthenticated, orderController.getUserOrders);
router.get('/:id', isAuthenticated, orderController.getOrderById);

module.exports = router;
