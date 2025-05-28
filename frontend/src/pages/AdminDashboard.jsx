import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/AdminDashboard.css';

/**
 * Tableau de bord principal pour les administrateurs
 * Cette page sert de hub central pour toutes les fonctionnalités d'administration
 */
function AdminDashboard() {
  const { user, loading, isAdmin } = useAuth();

  // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
  if (!loading && !user) {
    return <Navigate to="/login" />;
  }

  // Rediriger vers la page d'accueil si l'utilisateur n'est pas un administrateur
  if (!loading && user && !isAdmin()) {
    return <Navigate to="/access-denied" />;
  }

  const adminFeatures = [
    {
      id: 'users',
      title: 'Gestion des utilisateurs',
      description: 'Gérez les comptes utilisateurs et leurs permissions',
      icon: '👥',
      link: '/admin/users',
      color: '#673ab7'
    },
    {
      id: 'orders',
      title: 'Gestion des commandes',
      description: 'Consultez et gérez toutes les commandes',
      icon: '📦',
      link: '/admin/orders',
      color: '#2196f3'
    },
    {
      id: 'products',
      title: 'Gestion des produits',
      description: 'Ajoutez, modifiez ou supprimez des produits',
      icon: '🛍️',
      link: '/admin/products',
      color: '#4caf50'
    },
    {
      id: 'analytics',
      title: 'Statistiques',
      description: 'Consultez les statistiques et les rapports',
      icon: '📊',
      link: '/admin/analytics',
      color: '#ff9800'
    }
  ];

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h1>Tableau de bord administrateur</h1>
        <p className="dashboard-subtitle">
          Bienvenue, <strong>{user?.name || 'Administrateur'}</strong>. Gérez votre boutique depuis ce tableau de bord.
        </p>
      </header>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#e3f2fd' }}>🛒</div>
          <div className="stat-content">
            <h3>Commandes</h3>
            <p className="stat-value">24</p>
            <p className="stat-label">en attente</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#e8f5e9' }}>💰</div>
          <div className="stat-content">
            <h3>Revenus</h3>
            <p className="stat-value">4,250 €</p>
            <p className="stat-label">ce mois-ci</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#fff8e1' }}>👤</div>
          <div className="stat-content">
            <h3>Utilisateurs</h3>
            <p className="stat-value">156</p>
            <p className="stat-label">inscrits</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#f3e5f5' }}>📊</div>
          <div className="stat-content">
            <h3>Produits</h3>
            <p className="stat-value">42</p>
            <p className="stat-label">en stock</p>
          </div>
        </div>
      </div>

      <div className="dashboard-features">
        <h2>Fonctionnalités d'administration</h2>
        <div className="features-grid">
          {adminFeatures.map(feature => (
            <Link 
              to={feature.link} 
              className="feature-card" 
              key={feature.id}
              style={{ borderTopColor: feature.color }}
            >
              <div className="feature-icon" style={{ backgroundColor: feature.color }}>
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <div className="feature-action">
                Accéder
                <span className="arrow-icon">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="dashboard-quick-actions">
        <h2>Actions rapides</h2>
        <div className="quick-actions-list">
          <button className="quick-action-button">
            <span className="quick-action-icon">✚</span>
            Ajouter un produit
          </button>
          <button className="quick-action-button">
            <span className="quick-action-icon">📝</span>
            Voir les commandes récentes
          </button>
          <button className="quick-action-button">
            <span className="quick-action-icon">📊</span>
            Générer un rapport
          </button>
          <button className="quick-action-button">
            <span className="quick-action-icon">💬</span>
            Messages clients
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
