const jwt = require('jsonwebtoken');

exports.isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Format "Bearer TOKEN"
  if (!token) return res.status(401).json({ message: "Accès refusé. Pas de token." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role }
    next();
  } catch (err) {
    res.status(401).json({ message: "Token invalide." });
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: "Accès refusé. Admin uniquement." });
  }
  next();
};
