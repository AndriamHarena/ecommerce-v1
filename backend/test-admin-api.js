// Simple script to test the admin functionality directly
const http = require('http');

// Function to make HTTP requests
function makeRequest(options, data = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        try {
          const parsedData = JSON.parse(responseData);
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            data: parsedData
          });
        } catch (error) {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            data: responseData
          });
        }
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    if (data) {
      req.write(data);
    }
    
    req.end();
  });
}

// Test the health endpoint
async function testHealth() {
  console.log('Testing health endpoint...');
  try {
    const options = {
      hostname: 'localhost',
      port: 3001,
      path: '/health',
      method: 'GET'
    };
    
    const response = await makeRequest(options);
    console.log(`Health Status: ${response.statusCode}`);
    console.log('Health Response:', response.data);
    return response.statusCode === 200;
  } catch (error) {
    console.error('Health check failed:', error.message);
    return false;
  }
}

// Test admin login
async function testAdminLogin() {
  console.log('\nTesting admin login...');
  try {
    const loginData = JSON.stringify({
      email: 'admin@example.com',
      password: 'admin123'
    });
    
    const options = {
      hostname: 'localhost',
      port: 3001,
      path: '/api/auth/login',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': loginData.length
      }
    };
    
    const response = await makeRequest(options, loginData);
    console.log(`Login Status: ${response.statusCode}`);
    console.log('Login Response:', response.data);
    
    if (response.statusCode === 200 && response.data.token) {
      return response.data.token;
    } else {
      console.error('Admin login failed');
      return null;
    }
  } catch (error) {
    console.error('Admin login error:', error.message);
    return null;
  }
}

// Test getting all users (admin only)
async function testGetAllUsers(token) {
  console.log('\nTesting get all users (admin only)...');
  try {
    const options = {
      hostname: 'localhost',
      port: 3001,
      path: '/api/user/all',
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
    
    const response = await makeRequest(options);
    console.log(`Get All Users Status: ${response.statusCode}`);
    console.log('Users Response:', response.data);
    return response.statusCode === 200;
  } catch (error) {
    console.error('Get all users error:', error.message);
    return false;
  }
}

// Run all tests
async function runTests() {
  console.log('ADMIN USER MANAGEMENT API TEST');
  console.log('=============================\n');
  
  // Test health endpoint
  const healthOk = await testHealth();
  if (!healthOk) {
    console.error('Health check failed - server may not be running properly');
    return;
  }
  
  // Test admin login
  const adminToken = await testAdminLogin();
  if (!adminToken) {
    console.error('Admin login failed - cannot continue tests');
    return;
  }
  
  // Test get all users (admin only)
  const getAllUsersOk = await testGetAllUsers(adminToken);
  if (!getAllUsersOk) {
    console.error('Get all users test failed');
  }
  
  console.log('\nTEST SUMMARY');
  console.log('===========');
  console.log(`Health Check: ${healthOk ? 'PASSED ✓' : 'FAILED ✗'}`);
  console.log(`Admin Login: ${adminToken ? 'PASSED ✓' : 'FAILED ✗'}`);
  console.log(`Get All Users: ${getAllUsersOk ? 'PASSED ✓' : 'FAILED ✗'}`);
  
  if (healthOk && adminToken && getAllUsersOk) {
    console.log('\nAll tests PASSED! Your admin user management functionality is working correctly.');
    console.log('You can now implement this in your frontend application.');
  } else {
    console.log('\nSome tests FAILED. Please check the error messages above.');
  }
}

// Execute tests
runTests().catch(error => {
  console.error('Test execution error:', error);
});
