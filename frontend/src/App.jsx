import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import AdminPage from './pages/AdminPage';
import TestPage from './pages/TestPage';
import TestBasic from './pages/TestBasic';
import Navbar from './components/Navbar';

function App() {
  console.log('App component rendering');
  
  return (
    <div className="app-container">
      {/* Navbar appears on all routes */}
      <Navbar />
      
      {/* Main content area */}
      <div className="main-content" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <Routes>
        {/* Main application routes */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/basic" element={<TestBasic />} />
        {/* Route for debugging - will always render */}
        <Route path="*" element={
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Page Not Found</h1>
            <p>The page you are looking for doesn't exist or has been moved.</p>
            <div>
              <p>Available pages:</p>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li><a href="/" style={{ color: '#4a90e2', textDecoration: 'none' }}>Basic Test (Home)</a></li>
                <li><a href="/home" style={{ color: '#4a90e2', textDecoration: 'none' }}>Home</a></li>
                <li><a href="/login" style={{ color: '#4a90e2', textDecoration: 'none' }}>Login</a></li>
                <li><a href="/admin" style={{ color: '#4a90e2', textDecoration: 'none' }}>Admin</a></li>
                <li><a href="/test" style={{ color: '#4a90e2', textDecoration: 'none' }}>Test</a></li>
                <li><a href="/basic" style={{ color: '#4a90e2', textDecoration: 'none' }}>Basic Test</a></li>
              </ul>
            </div>
          </div>
        } />
        </Routes>
      </div>
      
      {/* Simple footer */}
      <footer style={{ 
        padding: '15px', 
        textAlign: 'center', 
        backgroundColor: '#f8f9fa', 
        borderTop: '1px solid #e7e7e7',
        marginTop: '40px'
      }}>
        <p>© {new Date().getFullYear()} E-commerce Admin Platform | All rights reserved</p>
      </footer>
    </div>
  );
}

export default App;