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
    },
    changePassword: async (passwordData) => {
        const response = await api.post('/user/reset-password', passwordData);
        return response.data;
    },
    updateProfile: async (profileData) => {
        const response = await api.put('/user/profile', profileData);
        return response.data;
    },
    forgotPassword: async (email) => {
        const response = await api.post('/user/forgot-password', { email });
        return response.data;
    },
    resetPasswordWithOtp: async (data) => {
        const response = await api.post('/user/reset-password-with-otp', data);
        return response.data;
    }
};