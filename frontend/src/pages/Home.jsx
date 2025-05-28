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
          }}>Accéder au tableau de bord Admin</Link>
        ) : (
          <div>
            <Link to="/login" style={{
              display: 'inline-block',
              background: 'white',
              color: '#764ba2',
              padding: '12px 24px',
              borderRadius: '30px',
              textDecoration: 'none',
              fontWeight: 'bold',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              marginRight: '15px'
            }}>Se connecter</Link>
            <Link to="/register" style={{
              display: 'inline-block',
              background: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              border: '2px solid white',
              padding: '12px 24px',
              borderRadius: '30px',
              textDecoration: 'none',
              fontWeight: 'bold',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}>S'inscrire</Link>
          </div>
        )}
      </div>

      {/* Features section */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '20px', textAlign: 'center' }}>Fonctionnalités clés de la plateforme</h2>
        
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
            <h3 style={{ marginBottom: '15px', color: '#333' }}>Gestion des utilisateurs</h3>
            <p style={{ marginBottom: '15px', color: '#666' }}>
              Gérez facilement tous les utilisateurs inscrits, modifiez leurs profils et contrôlez les permissions d'accès.
            </p>
            {user?.role === 'admin' && (
              <Link to="/admin/users" style={{ color: '#764ba2', textDecoration: 'none', fontWeight: '500' }}>
                Gérer les utilisateurs →
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
            <h3 style={{ marginBottom: '15px', color: '#333' }}>Catalogue de produits</h3>
            <p style={{ marginBottom: '15px', color: '#666' }}>
              Gérez votre catalogue de produits facilement. Ajoutez, modifiez et organisez votre inventaire efficacement.
            </p>
            <Link to="/" style={{ color: '#764ba2', textDecoration: 'none', fontWeight: 'bold' }}>
              Bientôt disponible →
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
            <h3 style={{ marginBottom: '15px', color: '#333' }}>Gestion des commandes</h3>
            <p style={{ marginBottom: '15px', color: '#666' }}>
              Suivez et gérez les commandes clients de la passation à la livraison avec nos outils complets.
            </p>
            <Link to="/" style={{ color: '#764ba2', textDecoration: 'none', fontWeight: 'bold' }}>
              Bientôt disponible →
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
        <h2 style={{ marginBottom: '25px', fontSize: '1.8rem' }}>Statut de la plateforme</h2>
        <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '15px' }}>
          <div style={{ padding: '15px' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#764ba2' }}>24/7</div>
            <div style={{ color: '#666' }}>Support disponible</div>
          </div>
          <div style={{ padding: '15px' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#764ba2' }}>99.9%</div>
            <div style={{ color: '#666' }}>Disponibilité</div>
          </div>
          <div style={{ padding: '15px' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#764ba2' }}>{new Date().toLocaleDateString()}</div>
            <div style={{ color: '#666' }}>Dernière mise à jour</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
