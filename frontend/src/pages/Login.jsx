import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('admin@example.com'); // Pre-filled for testing
    const [password, setPassword] = useState('admin123'); // Pre-filled for testing
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        
        try {
            // Direct API call to the backend
            const response = await axios.post('http://localhost:3001/api/auth/login', {
                email,
                password
            });
            
            const { token } = response.data;
            
            if (token) {
                // Store token in localStorage
                localStorage.setItem('token', token);
                
                // Decode token to get user info
                try {
                    const decoded = jwtDecode(token);
                    console.log('Logged in user:', decoded);
                    
                    // If user is admin, redirect to admin page
                    if (decoded.role === 'admin') {
                        navigate('/admin');
                    } else {
                        navigate('/');
                    }
                } catch (decodeError) {
                    console.error('Error decoding token:', decodeError);
                    navigate('/');
                }
            } else {
                setError('No token received from server');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
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
                    {isLoading ? 'Logging in...' : 'Login'}
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
