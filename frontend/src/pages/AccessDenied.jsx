import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/AccessDenied.css';

/**
 * Page d'accès refusé
 * Affichée lorsqu'un utilisateur tente d'accéder à une page pour laquelle il n'a pas les droits
 */
function AccessDenied() {
  return (
    <div className="access-denied-page">
      <div className="access-denied-container">
        <div className="access-denied-icon">🔐</div>
        <h1>Accès refusé</h1>
        <p>Vous n'avez pas les autorisations nécessaires pour accéder à cette page.</p>
        <p>Cette section est réservée aux utilisateurs ayant des droits spécifiques.</p>
        
        <div className="action-buttons">
          <Link to="/" className="primary-button">
            Retour à l'accueil
          </Link>
          <Link to="/login" className="secondary-button">
            Se connecter avec un autre compte
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AccessDenied;
