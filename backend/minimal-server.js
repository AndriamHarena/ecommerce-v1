// Minimal HTTP server for testing connectivity
const http = require('http');
const url = require('url');

// Sample user data
const users = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
    createdAt: '2023-05-15T10:30:00Z'
  },
  {
    id: '2',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    createdAt: '2023-01-01T00:00:00Z'
  }
];

// Create a simple HTTP server
const server = http.createServer((req, res) => {
  // Add CORS headers to all responses
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  // Log requests for better debugging
  console.log(`${req.method} ${req.url}`);
  if (req.headers.authorization) {
    console.log('Authorization header present');
  }
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  // Parse URL
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  
  console.log(`[${new Date().toISOString()}] ${req.method} ${path}`);
  
  // Set default content type
  res.setHeader('Content-Type', 'application/json');

  // Basic routing
  if (path === '/health' && req.method === 'GET') {
    // Health check endpoint
    res.statusCode = 200;
    res.end(JSON.stringify({
      status: 'ok',
      message: 'Minimal server is running',
      timestamp: new Date().toISOString()
    }));
  } 
  else if (path === '/api/auth/login' && req.method === 'POST') {
    // Handle login requests
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      try {
        const { email, password } = JSON.parse(body);
        
        // Very simple auth check - in a real app, never do this!
        if (email === 'john@example.com' && password === 'password123') {
          // Regular user login
          res.statusCode = 200;
          res.end(JSON.stringify({
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJuYW1lIjoiSm9obiBEb2UiLCJlbWFpbCI6ImpvaG5AZXhhbXBsZS5jb20iLCJyb2xlIjoidXNlciJ9.mock_signature'
          }));
        } 
        else if (email === 'admin@example.com' && password === 'admin123') {
          // Admin user login
          res.statusCode = 200;
          res.end(JSON.stringify({
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJuYW1lIjoiQWRtaW4gVXNlciIsImVtYWlsIjoiYWRtaW5AZXhhbXBsZS5jb20iLCJyb2xlIjoiYWRtaW4ifQ.mock_signature'
          }));
        } 
        else {
          // Invalid credentials
          res.statusCode = 401;
          res.end(JSON.stringify({ message: 'Invalid credentials' }));
        }
      } catch (error) {
        res.statusCode = 400;
        res.end(JSON.stringify({ message: 'Invalid request format' }));
      }
    });
  } 
  else if (path === '/api/user/profile' && req.method === 'GET') {
    // Get user profile with authentication check
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.statusCode = 401;
      return res.end(JSON.stringify({ message: 'Authentication required' }));
    }
    
    // Extract token and get user ID
    const token = authHeader.split(' ')[1];
    let userId;
    try {
      // Simple token parsing - in a real app, verify with JWT
      if (token.includes('eyJpZCI6IjEi')) { // Regular user token
        userId = '1';
      } else if (token.includes('eyJpZCI6IjIi')) { // Admin user token
        userId = '2';
      } else {
        throw new Error('Invalid token');
      }
    } catch (error) {
      res.statusCode = 401;
      return res.end(JSON.stringify({ message: 'Invalid token' }));
    }
    
    // Find the user
    const user = users.find(u => u.id === userId);
    if (!user) {
      res.statusCode = 404;
      return res.end(JSON.stringify({ message: 'User not found' }));
    }
    
    // Return the user profile without password
    const { password, ...userWithoutPassword } = user;
    res.statusCode = 200;
    res.end(JSON.stringify({
      message: 'User profile',
      user: userWithoutPassword
    }));
  } 
  else if (path === '/api/user/all' && req.method === 'GET') {
    // Get all users with admin check
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.statusCode = 401;
      return res.end(JSON.stringify({ message: 'Authentication required' }));
    }
    
    // Extract token and check for admin role
    const token = authHeader.split(' ')[1];
    let isAdmin = false;
    try {
      // Simple admin check - in a real app, verify with JWT
      isAdmin = token.includes('eyJpZCI6IjIi') && token.includes('admin');
    } catch (error) {
      res.statusCode = 401;
      return res.end(JSON.stringify({ message: 'Invalid token' }));
    }
    
    if (!isAdmin) {
      res.statusCode = 403;
      return res.end(JSON.stringify({ message: 'Admin access required' }));
    }
    
    // Return all users without passwords
    const usersWithoutPasswords = users.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
    
    res.statusCode = 200;
    res.end(JSON.stringify({
      users: usersWithoutPasswords
    }));
  } 
  else {
    // Route not found
    res.statusCode = 404;
    res.end(JSON.stringify({ message: 'Not found' }));
  }
});

// Better error handling for server
process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Start server
const PORT = 3001;
try {
  server.listen(PORT, () => {
    console.log(`Minimal server running at http://localhost:${PORT}`);
    console.log('Available endpoints:');
    console.log('- GET /health');
    console.log('- POST /api/auth/login');
    console.log('- GET /api/user/profile');
    console.log('- GET /api/user/all');
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is already in use. Try another port.`);
    } else {
      console.error('Server error:', err);
    }
  });
} catch (err) {
  console.error('Failed to start server:', err);
}
