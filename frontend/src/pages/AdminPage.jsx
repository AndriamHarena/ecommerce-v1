import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AdminUserList from '../components/AdminUserList';

/**
 * Admin page component that displays admin features
 * Only accessible to users with admin role
 */
function AdminPage() {
  const { user, loading } = useAuth();

  // Redirect to login if not authenticated
  if (!loading && !user) {
    return <Navigate to="/login" />;
  }

  // Redirect to home if user is not an admin
  if (!loading && user && user.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return (
    <div className="admin-page" style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Dashboard d'Administration</h1>
      
      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            margin: '0 auto', 
            border: '4px solid rgba(0, 0, 0, 0.1)', 
            borderRadius: '50%', 
            borderLeftColor: '#4a148c', 
            animation: 'spin 1s linear infinite' 
          }}></div>
          <p>Chargement...</p>
        </div>
      ) : (
        <div className="admin-sections" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          <section className="admin-section" style={{ 
            backgroundColor: 'white', 
            borderRadius: '8px', 
            padding: '1.5rem', 
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' 
          }}>
            <h2 style={{ marginTop: 0 }}>Gestion des utilisateurs</h2>
            <p style={{ color: '#666' }}>Gérez les utilisateurs et leurs rôles sur la plateforme.</p>
            <div style={{ marginTop: '1.5rem' }}>
              <a 
                href="/admin/users" 
                style={{ 
                  display: 'inline-block',
                  backgroundColor: '#4a148c',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  fontWeight: '500',
                  transition: 'background-color 0.2s'
                }}
              >
                Voir tous les utilisateurs
              </a>
            </div>
          </section>
          
          <section className="admin-section" style={{ 
            backgroundColor: 'white', 
            borderRadius: '8px', 
            padding: '1.5rem', 
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' 
          }}>
            <h2 style={{ marginTop: 0 }}>Gestion des commandes</h2>
            <p style={{ color: '#666' }}>Consultez et gérez les commandes de tous les utilisateurs.</p>
            <div style={{ marginTop: '1.5rem' }}>
              <a 
                href="#" 
                style={{ 
                  display: 'inline-block',
                  backgroundColor: '#f5f5f5',
                  color: '#999',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  fontWeight: '500',
                  cursor: 'not-allowed'
                }}
              >
                Bientôt disponible
              </a>
            </div>
          </section>
          
          <section className="admin-section" style={{ 
            backgroundColor: 'white', 
            borderRadius: '8px', 
            padding: '1.5rem', 
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' 
          }}>
            <h2 style={{ marginTop: 0 }}>Statistiques</h2>
            <p style={{ color: '#666' }}>Visualisez les statistiques et l'activité de la plateforme.</p>
            <div style={{ marginTop: '1.5rem' }}>
              <a 
                href="#" 
                style={{ 
                  display: 'inline-block',
                  backgroundColor: '#f5f5f5',
                  color: '#999',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  fontWeight: '500',
                  cursor: 'not-allowed'
                }}
              >
                Bientôt disponible
              </a>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default AdminPage;
