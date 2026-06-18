import api from './api';

export const urlService = {
    shortenUrl: async (urlData) => {
        const response = await api.post('/url/shorten', urlData);
        return response.data;
    },
    getCodes: async (page = 1, limit = 10) => {
        const response = await api.get('/url/codes', {
            params: { page, limit }
        });
        return response.data;
    }
};
