import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
// Fix pour jwt-decode, importation directe
import jwt_decode from 'jwt-decode';
const jwtDecode = jwt_decode.default || jwt_decode;
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('admin@example.com'); // Pre-filled for testing
    const [password, setPassword] = useState('admin123'); // Pre-filled for testing
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { login, user } = useAuth();
    
    // Rediriger l'utilisateur s'il est déjà connecté
    useEffect(() => {
        if (user) {
            if (user.role === 'admin') {
                navigate('/admin/dashboard');
            } else {
                navigate('/shop');
            }
        }
    }, [user, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        
        try {
            // Utiliser la fonction login du contexte d'authentification
            const result = await login(email, password);
            
            if (result.success) {
                console.log('Connexion réussie, rôle:', result.role);
                
                // Redirection selon le rôle
                if (result.role === 'admin') {
                    navigate('/admin/dashboard');
                } else {
                    navigate('/shop');
                }
            } else {
                setError(result.error || 'Échec de la connexion');
            }
        } catch (err) {
            console.error('Erreur de connexion:', err);
            setError(err.message || 'Une erreur est survenue lors de la connexion.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{
            maxWidth: '500px',
            margin: '0 auto',
            padding: '30px',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#fff',
            marginTop: '40px'
        }}>
            <h2 style={{ textAlign: 'center', marginBottom: '25px', color: '#4a148c' }}>Admin Login</h2>
            
            <form onSubmit={handleLogin}>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Email:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        style={{
                            width: '100%',
                            padding: '12px',
                            borderRadius: '4px',
                            border: '1px solid #ddd',
                            fontSize: '16px'
                        }}
                    />
                </div>
                
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Password:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        style={{
                            width: '100%',
                            padding: '12px',
                            borderRadius: '4px',
                            border: '1px solid #ddd',
                            fontSize: '16px'
                        }}
                    />
                </div>
                
                {error && (
                    <div style={{ 
                        padding: '10px', 
                        backgroundColor: '#ffebee', 
                        color: '#c62828', 
                        borderRadius: '4px',
                        marginBottom: '20px'
                    }}>
                        {error}
                    </div>
                )}
                
                <button 
                    type="submit" 
                    disabled={isLoading}
                    style={{
                        width: '100%',
                        padding: '14px',
                        backgroundColor: '#4a148c',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '16px',
                        cursor: isLoading ? 'not-allowed' : 'pointer',
                        opacity: isLoading ? 0.7 : 1
                    }}
                >
                    {isLoading ? 'Connexion en cours...' : 'Se connecter'}
                </button>
                
                <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px', color: '#666' }}>
                    <p>For testing, use the following credentials:</p>
                    <p style={{ fontFamily: 'monospace' }}>Email: admin@example.com</p>
                    <p style={{ fontFamily: 'monospace' }}>Password: admin123</p>
                </div>
            </form>
        </div>
    );
}

export default Login;
