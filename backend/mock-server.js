// Simple mock server for testing the frontend
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3001;
const JWT_SECRET = 'mock-secret-key';

// Enhanced CORS configuration
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://127.0.0.1:5173', 'http://127.0.0.1:5174'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Log all incoming requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use(express.json());

// Basic health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Enable pre-flight requests for all routes
app.options('*', cors());

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
  },
  {
    id: '3',
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password456',
    role: 'user',
    createdAt: '2023-06-20T14:25:00Z'
  },
  {
    id: '4',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    password: 'password789',
    role: 'user',
    createdAt: '2023-08-10T09:15:00Z'
  },
  {
    id: '5',
    name: 'Alice Williams',
    email: 'alice@example.com',
    password: 'password321',
    role: 'user',
    createdAt: '2023-09-05T16:45:00Z'
  }
];

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ message: "Accès refusé. Admin uniquement." });
  }
};

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

// Define routes in correct order (specific routes first, then parameterized routes)

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

// Get all users (admin only)
app.get('/api/user/all', isAuthenticated, isAdmin, (req, res) => {
  console.log('Admin request to get all users from:', req.user.email);
  
  // Return all users without their passwords
  const usersWithoutPasswords = mockUsers.map(user => {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  });
  
  res.json({ users: usersWithoutPasswords });
});

// Get user by ID (admin only)
app.get('/api/user/:id', isAuthenticated, isAdmin, (req, res) => {
  const userId = req.params.id;
  const user = mockUsers.find(u => u.id === userId);
  
  if (!user) {
    return res.status(404).json({ message: 'Utilisateur non trouvé' });
  }
  
  const { password, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
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
