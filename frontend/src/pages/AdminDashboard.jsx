import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/AdminDashboard.css';

function AdminDashboard() {
  const { user, loading, isAdmin } = useAuth();

  if (!loading && !user) {
    return <Navigate to="/login" />;
  }

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

      <section className="dashboard-stats">
        {[
          { icon: '🛒', title: 'Commandes', value: '24', label: 'en attente', bg: '#e3f2fd' },
          { icon: '💰', title: 'Revenus', value: '4,250 €', label: 'ce mois-ci', bg: '#e8f5e9' },
          { icon: '👤', title: 'Utilisateurs', value: '156', label: 'inscrits', bg: '#fff8e1' },
          { icon: '📊', title: 'Produits', value: '42', label: 'en stock', bg: '#f3e5f5' }
        ].map((stat, index) => (
          <div className="stat-card" key={index}>
            <div className="stat-icon" style={{ backgroundColor: stat.bg }}>{stat.icon}</div>
            <div className="stat-content">
              <h3>{stat.title}</h3>
              <p className="stat-value">{stat.value}</p>
              <p className="stat-label">{stat.label}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="dashboard-features">
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
                Accéder <span className="arrow-icon">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="dashboard-quick-actions">
        <h2>Actions rapides</h2>
        <div className="quick-actions-list">
          <button className="quick-action-button"><span className="quick-action-icon">✚</span> Ajouter un produit</button>
          <button className="quick-action-button"><span className="quick-action-icon">📝</span> Voir les commandes récentes</button>
          <button className="quick-action-button"><span className="quick-action-icon">📊</span> Générer un rapport</button>
          <button className="quick-action-button"><span className="quick-action-icon">💬</span> Messages clients</button>
        </div>
      </section>
    </div>
  );
}

export default AdminDashboard;
