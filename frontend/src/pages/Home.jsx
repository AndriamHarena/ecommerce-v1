import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Home() {
  const { user } = useAuth();
  
  return (
    <div className="home-container">
      {/* Hero section */}
      <div style={{
        backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '60px 20px',
        borderRadius: '8px',
        marginBottom: '30px',
        textAlign: 'center',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>E-commerce Admin Platform</h1>
        <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto 30px' }}>
          Manage your e-commerce platform efficiently with our comprehensive admin tools.
        </p>
        {user?.role === 'admin' ? (
          <Link to="/admin" style={{
            display: 'inline-block',
            background: 'white',
            color: '#764ba2',
            padding: '12px 24px',
            borderRadius: '30px',
            textDecoration: 'none',
            fontWeight: 'bold',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>Go to Admin Dashboard</Link>
        ) : (
          <Link to="/login" style={{
            display: 'inline-block',
            background: 'white',
            color: '#764ba2',
            padding: '12px 24px',
            borderRadius: '30px',
            textDecoration: 'none',
            fontWeight: 'bold',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>Log In</Link>
        )}
      </div>

      {/* Features section */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '20px', textAlign: 'center' }}>Key Platform Features</h2>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
          {/* Feature Cards */}
          <div style={{
            flex: '1 1 300px',
            maxWidth: '350px',
            padding: '25px',
            borderRadius: '8px',
            backgroundColor: '#f8f9fa',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
            transition: 'transform 0.3s ease',
            border: '1px solid #e7e7e7'
          }}>
            <h3 style={{ marginBottom: '15px', color: '#333' }}>User Management</h3>
            <p style={{ marginBottom: '15px', color: '#666' }}>
              Easily manage all registered users, edit their profiles, and control access permissions.
            </p>
            {user?.role === 'admin' && (
              <Link to="/admin" style={{ color: '#764ba2', textDecoration: 'none', fontWeight: 'bold' }}>
                Manage Users →
              </Link>
            )}
          </div>
          
          <div style={{
            flex: '1 1 300px',
            maxWidth: '350px',
            padding: '25px',
            borderRadius: '8px',
            backgroundColor: '#f8f9fa',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
            transition: 'transform 0.3s ease',
            border: '1px solid #e7e7e7'
          }}>
            <h3 style={{ marginBottom: '15px', color: '#333' }}>Product Catalog</h3>
            <p style={{ marginBottom: '15px', color: '#666' }}>
              Manage your product catalog with ease. Add, edit, and organize your inventory efficiently.
            </p>
            <Link to="/" style={{ color: '#764ba2', textDecoration: 'none', fontWeight: 'bold' }}>
              Coming Soon →
            </Link>
          </div>
          
          <div style={{
            flex: '1 1 300px',
            maxWidth: '350px',
            padding: '25px',
            borderRadius: '8px',
            backgroundColor: '#f8f9fa',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
            transition: 'transform 0.3s ease',
            border: '1px solid #e7e7e7'
          }}>
            <h3 style={{ marginBottom: '15px', color: '#333' }}>Order Processing</h3>
            <p style={{ marginBottom: '15px', color: '#666' }}>
              Track and manage customer orders from placement to delivery with our comprehensive tools.
            </p>
            <Link to="/" style={{ color: '#764ba2', textDecoration: 'none', fontWeight: 'bold' }}>
              Coming Soon →
            </Link>
          </div>
        </div>
      </div>
      
      {/* Stats section */}
      <div style={{
        padding: '30px',
        backgroundColor: '#f0f4f8',
        borderRadius: '8px',
        marginBottom: '40px',
        textAlign: 'center'
      }}>
        <h2 style={{ marginBottom: '25px', fontSize: '1.8rem' }}>Platform Status</h2>
        <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '15px' }}>
          <div style={{ padding: '15px' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#764ba2' }}>24/7</div>
            <div style={{ color: '#666' }}>Support Available</div>
          </div>
          <div style={{ padding: '15px' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#764ba2' }}>99.9%</div>
            <div style={{ color: '#666' }}>Uptime</div>
          </div>
          <div style={{ padding: '15px' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#764ba2' }}>{new Date().toLocaleDateString()}</div>
            <div style={{ color: '#666' }}>Last Updated</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
