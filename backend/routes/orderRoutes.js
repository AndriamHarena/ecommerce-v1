const express = require('express');
const router = express.Router();
const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware');
const orderController = require('../controllers/orderController');

// Créer une commande
router.post('/', isAuthenticated, orderController.createOrder);

// Voir les commandes du user connecté
router.get('/', isAuthenticated, orderController.getUserOrders);

// Voir une commande spécifique du user
router.get('/:id', isAuthenticated, orderController.getOrderById);

// Voir toutes les commandes (admin seulement)
router.get('/admin/all', isAuthenticated, isAdmin, orderController.getAllOrders);

module.exports = router;
