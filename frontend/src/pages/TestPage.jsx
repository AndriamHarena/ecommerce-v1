import React from 'react';

// Extremely simplified test page with no dependencies or complex code
function TestPage() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Test Page</h1>
      <p>This is a simple test page. If you can see this, React is working.</p>
      <p>Current time: {new Date().toLocaleTimeString()}</p>
    </div>
  );
}

export default TestPage;
