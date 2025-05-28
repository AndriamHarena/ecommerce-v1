import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Check for existing token on startup
    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    // Decode token to get basic user info
                    const decoded = jwtDecode(token);
                    
                    // Check if token is expired
                    const currentTime = Date.now() / 1000;
                    if (decoded.exp && decoded.exp < currentTime) {
                        console.log('Token expired');
                        localStorage.removeItem('token');
                        setUser(null);
                    } else {
                        console.log('Valid token found, user:', decoded);
                        setUser(decoded);
                    }
                } catch (err) {
                    console.error('Error decoding token:', err);
                    localStorage.removeItem('token');
                }
            }
            setLoading(false);
        };
        
        checkAuth();
    }, []);

    // Login function
    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        
        try {
            const response = await axios.post('http://localhost:3001/api/auth/login', {
                email,
                password
            });
            
            const { token } = response.data;
            
            if (token) {
                localStorage.setItem('token', token);
                const decoded = jwtDecode(token);
                setUser(decoded);
                return { success: true };
            } else {
                throw new Error('No token received');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError(err.response?.data?.message || 'Login failed');
            return { 
                success: false, 
                error: err.response?.data?.message || 'Login failed' 
            };
        } finally {
            setLoading(false);
        }
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };
    
    // Value object with auth state and functions
    const value = {
        user,
        login,
        logout,
        loading,
        error,
        isAdmin: user?.role === 'admin'
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
