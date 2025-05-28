import { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { getCurrentUser } from '../api/apiClient';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                // First set basic user info from JWT token
                const decoded = jwtDecode(token);
                setUser(decoded);
                
                // Then fetch complete user profile
                fetchUserProfile();
            } catch (err) {
                console.error("Token invalide", err);
                setUser(null);
                setError("Invalid authentication token");
            }
        }
    }, []);
    
    /**
     * Fetches the complete user profile from the backend
     */
    const fetchUserProfile = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getCurrentUser();
            // The API returns user data in a 'user' property
            const userData = response.user || response;
            setUser(prevUser => ({
                ...prevUser,   // Keep JWT data
                ...userData    // Add/override with complete profile data
            }));
        } catch (err) {
            console.error("Error fetching user profile:", err);
            setError("Failed to load user profile");
            // Don't reset user here as we still have basic JWT data
        } finally {
            setLoading(false);
        }
    };

    const login = async (token) => {
        localStorage.setItem('token', token);
        const decoded = jwtDecode(token);
        setUser(decoded); // Set basic user info immediately
        
        // Then fetch complete profile
        await fetchUserProfile();
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, error, refreshUserProfile: fetchUserProfile }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
