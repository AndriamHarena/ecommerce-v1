import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
// Fix pour jwt-decode, importation directe
import jwt_decode from 'jwt-decode';
const jwtDecode = jwt_decode.default || jwt_decode;

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [role, setRole] = useState(null);

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
                        setRole(null);
                    } else {
                        console.log('Valid token found, user:', decoded);
                        setUser(decoded);
                        // Extraire et stocker explicitement le rôle
                        const userRole = decoded.role || 'user'; // Par défaut 'user' si aucun rôle n'est spécifié
                        setRole(userRole);
                        // Stocker également le rôle dans localStorage pour persistance
                        localStorage.setItem('userRole', userRole);
                    }
                } catch (err) {
                    console.error('Error decoding token:', err);
                    localStorage.removeItem('token');
                    localStorage.removeItem('userRole');
                    setRole(null);
                }
            } else {
                // Nettoyer les données utilisateur si aucun token n'est trouvé
                setUser(null);
                setRole(null);
                localStorage.removeItem('userRole');
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
                
                // Extraire le rôle de l'utilisateur
                const userRole = decoded.role || 'user';
                
                // Mettre à jour l'état utilisateur et rôle
                setUser(decoded);
                setRole(userRole);
                
                // Stocker le rôle dans localStorage pour la persistance
                localStorage.setItem('userRole', userRole);
                
                return { 
                    success: true,
                    role: userRole
                };
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
        localStorage.removeItem('userRole');
        setUser(null);
        setRole(null);
    };
    
    // Fonctions de vérification des rôles
    const isAdmin = () => role === 'admin';
    const isUser = () => role === 'user';
    const hasRole = (requiredRole) => role === requiredRole;
    
    // Fonction pour rafraîchir le profil utilisateur
    const refreshUserProfile = async () => {
        setLoading(true);
        setError(null);
        
        try {
            // Vérifier si un token existe
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found');
            }
            
            // Décoder le token pour obtenir les informations utilisateur
            const decoded = jwtDecode(token);
            setUser(decoded);
            
            // Extraire et mettre à jour le rôle
            const userRole = decoded.role || 'user';
            setRole(userRole);
            localStorage.setItem('userRole', userRole);
            
            return true;
        } catch (err) {
            console.error('Error refreshing user profile:', err);
            setError('Failed to refresh user profile');
            return false;
        } finally {
            setLoading(false);
        }
    };
    
    // Value object with auth state and functions
    const value = {
        user,
        role,
        login,
        logout,
        loading,
        error,
        isAdmin,
        isUser,
        hasRole,
        refreshUserProfile
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
