import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:3001/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add a request interceptor to attach the JWT token to all requests
apiClient.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

/**
 * Login user with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} Login response with token
 */
export const loginUser = async (email, password) => {
    try {
        console.log('Attempting login for:', email);
        const response = await apiClient.post('/auth/login', { email, password });
        console.log('Login successful');
        return response.data;
    } catch (error) {
        console.error('Login error:', error.response?.data || error.message);
        throw error;
    }
};

export const getProducts = async () => {
    const response = await apiClient.get('/products');
    return response.data;
};

/**
 * Récupère les commandes de l'utilisateur connecté
 * @returns {Promise<Array>} Liste des commandes de l'utilisateur
 */
export const getUserOrders = async () => {
    try {
        // Utiliser la route correcte définie dans le backend
        const response = await apiClient.get('/orders');
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des commandes:', error);
        throw error;
    }
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

/**
 * Fetches all users from the server (admin only)
 * @returns {Promise<Array>} List of users
 */
export const getAllUsers = async () => {
    try {
        const response = await apiClient.get('/user/all');
        // The API returns users in a 'users' property
        return response.data;
    } catch (error) {
        console.error('Error fetching users list:', error);
        if (error.response && error.response.status === 403) {
            throw new Error('Access denied: Admin privileges required');
        }
        throw error;
    }
};

/**
 * Updates a user's role (admin only)
 * @param {string} userId - The ID of the user to update
 * @param {string} newRole - The new role to assign ('user' or 'admin')
 * @returns {Promise<Object>} Updated user information
 */
export const updateUserRole = async (userId, newRole) => {
    try {
        if (!userId || !newRole) {
            throw new Error('User ID and new role are required');
        }
        
        if (newRole !== 'user' && newRole !== 'admin') {
            throw new Error('Invalid role. Role must be either "user" or "admin"');
        }

        const response = await apiClient.patch(`/user/${userId}/role`, { role: newRole });
        return response.data;
    } catch (error) {
        console.error('Error updating user role:', error);
        if (error.response && error.response.status === 403) {
            throw new Error('Access denied: Admin privileges required');
        }
        throw error;
    }
};

/**
 * Crée une nouvelle commande
 * @param {Object} orderData - Les données de la commande (produits, adresse, etc.)
 * @returns {Promise<Object>} La commande créée
 */
export const createOrder = async (orderData) => {
  try {
    const response = await apiClient.post('/orders', orderData);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création de la commande:', error);
    throw error;
  }
};

// Add token to all requests
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default apiClient;