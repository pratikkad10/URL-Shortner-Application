import api from './api';

export const analyticsService = {
    getDashboardStats: async () => {
        const response = await api.get('/analytics/dashboard');
        return response.data;
    },
    getLinkAnalytics: async (shortUrl, days = 30) => {
        const response = await api.get(`/analytics/link/${shortUrl}?days=${days}`);
        return response.data;
    }
};
