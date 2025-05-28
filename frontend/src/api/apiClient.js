import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:3001/api',
});

export const getProducts = async () => {
    const response = await apiClient.get('/products');
    return response.data;
};

/**
 * Fetches the current user's profile data from the server
 * @returns {Promise<Object>} User profile data
 */
export const getCurrentUser = async () => {
    try {
        const response = await apiClient.get('/user/profile');
        return response.data;
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error;
    }
};

// Ajouter automatiquement le token si présent
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default apiClient;