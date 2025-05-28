import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/auth/login', {
                email,
                password,
            });

            const token = response.data.token;
            localStorage.setItem('token', token); // Sauvegarde du token
            navigate('/'); // Redirection vers l'accueil
        } catch (err) {
            setError(err.response?.data?.message || 'Erreur de connexion');
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h2>Connexion</h2>
            <form onSubmit={handleLogin} style={{ maxWidth: '400px' }}>
                <div>
                    <label>Email :</label><br />
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Mot de passe :</label><br />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit" style={{ marginTop: '1rem' }}>Se connecter</button>
            </form>
        </div>
    );
}

export default Login;
