// Simple mock server with minimal dependencies
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3001;
const JWT_SECRET = 'mock-secret-key';

// Enable CORS for all routes with permissive settings
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Pre-flight requests
app.options('*', cors());

app.use(express.json());

// Enhanced request logging
app.use((req, res, next) => {
  console.log(`\n===== INCOMING REQUEST =====`); 
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log(`Headers: ${JSON.stringify(req.headers, null, 2)}`);
  if (req.body && Object.keys(req.body).length > 0) {
    console.log(`Body: ${JSON.stringify(req.body, null, 2)}`);
  }
  
  // Track response for logging
  const originalSend = res.send;
  res.send = function(data) {
    console.log(`\n===== OUTGOING RESPONSE =====`);
    console.log(`Status: ${res.statusCode}`);
    console.log(`Response: ${data}\n`);
    return originalSend.apply(res, arguments);
  };
  
  next();
});

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

// Simple authentication middleware
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Login endpoint
app.post('/api/auth/login', (req, res) => {
  console.log('Login attempt:', req.body);
  const { email, password } = req.body;
  
  const user = mockUsers.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  
  const token = jwt.sign(
    { 
      id: user.id, 
      name: user.name, 
      email: user.email, 
      role: user.role 
    }, 
    JWT_SECRET, 
    { expiresIn: '1h' }
  );
  
  console.log('Login successful for:', user.email);
  res.json({ token });
});

// User profile endpoint
app.get('/api/user/profile', authenticate, (req, res) => {
  console.log('Profile requested for user:', req.user);
  
  const user = mockUsers.find(u => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  const { password, ...userWithoutPassword } = user;
  res.json({
    message: "User profile",
    user: userWithoutPassword
  });
});

// Get all users endpoint (admin only)
app.get('/api/user/all', authenticate, (req, res) => {
  console.log('All users requested by:', req.user.email);
  
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden: Admin access required' });
  }
  
  const usersWithoutPasswords = mockUsers.map(user => {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  });
  
  res.json({ users: usersWithoutPasswords });
});

// Individual user endpoint (admin only)
app.get('/api/user/byid/:id', authenticate, (req, res) => {
  console.log('User requested by ID:', req.params.id);
  
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden: Admin access required' });
  }
  
  const user = mockUsers.find(u => u.id === req.params.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  const { password, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Simple mock server running at http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('- POST /api/auth/login');
  console.log('- GET /api/user/profile');
  console.log('- GET /api/user/all (admin only)');
  console.log('- GET /api/user/byid/:id (admin only)');
  console.log('- GET /health');
});
