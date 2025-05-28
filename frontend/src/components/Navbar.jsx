import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout, loading, error, refreshUserProfile } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{ padding: '1rem', background: '#eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div className="nav-left">
        <Link to="/" style={{ marginRight: '1rem' }}>Accueil</Link>
        
        {user && (
          <Link to="/orders" style={{ marginRight: '1rem' }}>
            Mes commandes
          </Link>
        )}
      </div>
      
      <div className="nav-right">
        {loading ? (
          <span style={{ marginRight: '1rem', fontSize: '0.9rem', color: '#666' }}>Chargement...</span>
        ) : error ? (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '0.5rem', color: '#d32f2f', fontSize: '0.9rem' }}>Erreur</span>
            <button 
              onClick={refreshUserProfile} 
              style={{ padding: '0.2rem 0.5rem', fontSize: '0.8rem', cursor: 'pointer' }}
            >
              Réessayer
            </button>
          </div>
        ) : user ? (
          <>
            <Link to="/profile" style={{ marginRight: '1rem', display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '0.5rem' }}>
                Bonjour {user.name || 'Utilisateur'}
              </span>
              {user.email && (
                <span style={{ fontSize: '0.8rem', color: '#666' }}>({user.email})</span>
              )}
            </Link>
            <button 
              onClick={handleLogout} 
              style={{ marginRight: '1rem', padding: '0.3rem 0.8rem', cursor: 'pointer' }}
            >
              Déconnexion
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ marginRight: '1rem' }}>Connexion</Link>
            <Link to="/register">Inscription</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
