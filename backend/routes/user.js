const express = require('express');
const router = express.Router();
const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

// Routes protégées
router.get('/profile', isAuthenticated, (req, res) => {
  res.json({ message: "Profil utilisateur", user: req.user });
});

router.get('/admin', isAuthenticated, isAdmin, (req, res) => {
  res.json({ message: "Bienvenue admin !" });
});

// Routes admin : gestion des utilisateurs
router.get('/all', isAuthenticated, isAdmin, userController.getAllUsers);
router.get('/:id', isAuthenticated, isAdmin, userController.getUserById);
router.put('/:id', isAuthenticated, isAdmin, userController.updateUser);
router.delete('/:id', isAuthenticated, isAdmin, userController.deleteUser);

module.exports = router;
