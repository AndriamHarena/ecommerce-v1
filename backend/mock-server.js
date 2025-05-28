// Simple mock server for testing the frontend
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3001;
const JWT_SECRET = 'mock-secret-key';

app.use(cors());
app.use(express.json());

// Mock user data
const mockUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    role: 'user',
    createdAt: '2023-05-15T10:30:00Z'
  },
  {
    id: '2',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin',
    createdAt: '2023-01-01T00:00:00Z'
  }
];

// Middleware to check authentication
const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Format "Bearer TOKEN"
  if (!token) return res.status(401).json({ message: "Accès refusé. Pas de token." });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { id, role }
    next();
  } catch (err) {
    res.status(401).json({ message: "Token invalide." });
  }
};

// Login route
app.post('/api/auth/login', (req, res) => {
  console.log('Login request received:', req.body);
  
  const { email, password } = req.body;
  const user = mockUsers.find(u => u.email === email && u.password === password);
  
  if (!user) {
    console.log('Login failed: User not found or password incorrect');
    return res.status(401).json({ message: 'Email ou mot de passe invalide' });
  }
  
  console.log('Login successful for user:', user.email);
  
  const token = jwt.sign(
    { id: user.id, name: user.name, email: user.email, role: user.role }, 
    JWT_SECRET, 
    { expiresIn: '1h' }
  );
  
  res.json({ token });
});

// User profile route
app.get('/api/user/profile', isAuthenticated, (req, res) => {
  console.log('Profile request received. User from token:', req.user);
  
  const user = mockUsers.find(u => u.id === req.user.id);
  
  if (!user) {
    console.log('User profile not found for id:', req.user.id);
    return res.status(404).json({ message: 'Utilisateur non trouvé' });
  }
  
  console.log('Returning profile for user:', user.email);
  
  // Don't return the password
  const { password, ...userWithoutPassword } = user;
  
  res.json({ 
    message: "Profil utilisateur", 
    user: userWithoutPassword 
  });
});

// Products route (just for testing)
app.get('/api/products', (req, res) => {
  res.json([
    { id: '1', name: 'Product 1', price: 99.99 },
    { id: '2', name: 'Product 2', price: 149.99 },
    { id: '3', name: 'Product 3', price: 199.99 }
  ]);
});

// Start server
app.listen(PORT, () => {
  console.log(`Mock server running on http://localhost:${PORT}`);
});
