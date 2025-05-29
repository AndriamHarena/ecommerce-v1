import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AdminUserList from '../components/AdminUserList';

/**
 * Page d'administration dédiée à la gestion des utilisateurs
 * Accessible uniquement aux utilisateurs ayant le rôle admin
 */
function AdminUsersPage() {
  const { user, loading } = useAuth();

  // Redirection vers la page de connexion si non authentifié
  if (!loading && !user) {
    return <Navigate to="/login" />;
  }

  // Redirection vers la page d'accueil si l'utilisateur n'est pas un administrateur
  if (!loading && user && user.role !== 'admin') {
    return (
      <div className="access-denied-page">
        <div className="access-denied-container">
          <div className="access-denied-icon">🚫</div>
          <h1>Accès refusé</h1>
          <p>Vous n'avez pas les autorisations nécessaires pour accéder à cette page.</p>
          <p>Cette section est réservée aux administrateurs.</p>
          <a href="/" className="back-home-button">Retour à l'accueil</a>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-users-page"  style={{
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '1rem',
    boxSizing: 'border-box'
  }}>
      <div className="admin-header">
        <h1>Gestion des utilisateurs</h1>
        <p className="admin-breadcrumb">
          <a href="/admin">Tableau de bord</a> &gt; Utilisateurs
        </p>
      </div>
      
      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <div className="loading-spinner"></div>
          <p>Chargement...</p>
        </div>
      ) : (
        <AdminUserList />
      )}
    </div>
  );
}

export default AdminUsersPage;
