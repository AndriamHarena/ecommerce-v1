// Script to start the backend with environment variables
const { spawn } = require('child_process');

// Set environment variables for the backend
const env = {
  ...process.env,
  PORT: 3001,
  MONGODB_URI: 'mongodb://127.0.0.1:27017/ecommerce',
  JWT_SECRET: 'your-secret-key-for-development-only'
};

// Start the backend server with these environment variables
const server = spawn('node', ['index.js'], { 
  env, 
  stdio: 'inherit' 
});

server.on('error', (err) => {
  console.error('Failed to start server:', err);
});

console.log(`Server starting with environment variables:
PORT: ${env.PORT}
MONGODB_URI: ${env.MONGODB_URI}
JWT_SECRET: ${env.JWT_SECRET} (masked for security)`);
