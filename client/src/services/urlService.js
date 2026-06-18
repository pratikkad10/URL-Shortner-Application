import api from './api';

export const urlService = {
    shortenUrl: async (urlData) => {
        const response = await api.post('/url/shorten', urlData);
        return response.data;
    }
};
