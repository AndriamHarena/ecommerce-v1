import React from 'react';

function TestBasic() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Basic Test Page</h1>
      <p>If you can see this message, React is rendering correctly.</p>
      <p>Current time: {new Date().toLocaleTimeString()}</p>
    </div>
  );
}

export default TestBasic;
