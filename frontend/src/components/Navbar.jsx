import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import '../styles/Navbar.css';

function Navbar() {
  const { user, logout, loading, error, refreshUserProfile } = useAuth();
  const { cart, itemCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="nav-link">Accueil</Link>
        <Link to="/products" className="nav-link">Produits</Link>
        
        {user && (
          <>
            <Link to="/orders" className="nav-link">
              Mes commandes
            </Link>
            
            {/* Lien tableau de bord admin - uniquement visible pour les administrateurs */}
            {user.role === 'admin' && (
              <Link to="/admin" className="admin-link">
                Tableau de bord Admin
              </Link>
            )}
          </>
        )}
      </div>
      
      <div className="nav-right">
        {/* Lien vers le panier avec compteur */}
        <Link to="/cart" className="cart-link">
          <span className="cart-icon">🛒</span>
          <span>Panier</span>
          {itemCount > 0 && (
            <span className="cart-count">{itemCount}</span>
          )}
        </Link>
        
        {loading ? (
          <span className="loading-text">Chargement...</span>
        ) : error ? (
          <div className="error-container">
            <span className="error-text">Erreur</span>
            <button onClick={refreshUserProfile} className="retry-btn">
              Réessayer
            </button>
          </div>
        ) : user ? (
          <>
            <Link to="/profile" className="user-greeting">
              <span className="user-name">
                Bonjour {user.name || 'Utilisateur'}
              </span>
              {user.email && (
                <span className="user-email">({user.email})</span>
              )}
            </Link>
            <button onClick={handleLogout} className="logout-btn">
              Déconnexion
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Connexion</Link>
            <Link to="/register" className="nav-link">Inscription</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
