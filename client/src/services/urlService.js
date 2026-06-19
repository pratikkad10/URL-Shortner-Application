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
    },
    deleteUrl: async (shortUrl) => {
        const response = await api.delete(`/url/delete/${shortUrl}`);
        return response.data;
    },
    updateUrl: async (id, data) => {
        const response = await api.put(`/url/update/${id}`, data);
        return response.data;
    }
};
