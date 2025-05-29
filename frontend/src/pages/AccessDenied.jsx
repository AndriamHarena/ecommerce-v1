import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/AccessDenied.css';

function AccessDenied() {
  return (
    <div
      className="access-denied-page"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '1rem',
        backgroundColor: '#f4f4f4'
      }}
    >
      <div
        className="access-denied-container"
        style={{
          backgroundColor: '#fff',
          borderRadius: '8px',
          padding: '2rem',
          maxWidth: '500px',
          width: '100%',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}
      >
        <div
          className="access-denied-icon"
          style={{ fontSize: '3rem', marginBottom: '1rem' }}
        >
          🔐
        </div>
        <h1 style={{ marginBottom: '0.5rem' }}>Accès refusé</h1>
        <p style={{ marginBottom: '0.5rem' }}>
          Vous n'avez pas les autorisations nécessaires pour accéder à cette page.
        </p>
        <p style={{ marginBottom: '1.5rem' }}>
          Cette section est réservée aux utilisateurs ayant des droits spécifiques.
        </p>

        <div
          className="action-buttons"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}
        >
          <Link
            to="/"
            className="primary-button"
            style={{
              backgroundColor: '#4a148c',
              color: '#fff',
              padding: '0.75rem',
              borderRadius: '5px',
              textDecoration: 'none',
              fontWeight: 'bold'
            }}
          >
            Retour à l'accueil
          </Link>
          <Link
            to="/login"
            className="secondary-button"
            style={{
              backgroundColor: '#eee',
              color: '#333',
              padding: '0.75rem',
              borderRadius: '5px',
              textDecoration: 'none'
            }}
          >
            Se connecter avec un autre compte
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AccessDenied;
