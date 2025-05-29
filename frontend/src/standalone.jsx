import React from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  return (
    <div>
      <h1>Standalone Test</h1>
      <p>This is a minimal React app without any dependencies.</p>
      <p>Current time: {new Date().toLocaleTimeString()}</p>
    </div>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
