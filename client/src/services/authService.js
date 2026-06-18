import api from './api';

export const authService = {
    register: async (userData) => {
        const response = await api.post('/user/register', userData);
        return response.data;
    },
    login: async (credentials) => {
        const response = await api.post('/user/login', credentials);
        return response.data;
    },
    logout: async () => {
        const response = await api.post('/user/logout');
        return response.data;
    },
    checkAuth: async () => {
        const response = await api.get('/user/me');
        return response.data;
    }
};