import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{ padding: '1rem', background: '#eee' }}>
      <Link to="/" style={{ marginRight: '1rem' }}>Accueil</Link>

      {user ? (
        <>
          <Link to="/orders" style={{ marginRight: '1rem' }}>
            Mes commandes
          </Link>
          <span style={{ marginRight: '1rem' }}>
            Bonjour {user.name || 'Utilisateur'}
          </span>
          <button onClick={handleLogout} style={{ marginRight: '1rem' }}>
            Déconnexion
          </button>
        </>
      ) : (
        <>
          <Link to="/login" style={{ marginRight: '1rem' }}>Connexion</Link>
          <Link to="/register">Inscription</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
