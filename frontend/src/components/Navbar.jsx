import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ padding: '1rem', background: '#eee' }}>
      <Link to="/" style={{ marginRight: '1rem' }}>Accueil</Link>
      <Link to="/login" style={{ marginRight: '1rem' }}>Connexion</Link>
      <Link to="/register">Inscription</Link>
    </nav>
  );
}

export default Navbar;
