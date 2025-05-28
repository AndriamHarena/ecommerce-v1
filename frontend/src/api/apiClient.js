import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:3001/api',
});

export const getProducts = async () => {
    const response = await apiClient.get('/products');
    return response.data;
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