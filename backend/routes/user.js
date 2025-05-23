const express = require('express');
const router = express.Router();
const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware');

router.get('/profile', isAuthenticated, (req, res) => {
  res.json({ message: "Profil utilisateur", user: req.user });
});

router.get('/admin', isAuthenticated, isAdmin, (req, res) => {
  res.json({ message: "Bienvenue admin !" });
});

module.exports = router;
