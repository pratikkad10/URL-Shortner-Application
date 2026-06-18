import axios from 'axios';

const api = axios.create({
    // actual backend URL or use environment variables
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1',
    withCredentials: true, // Required if your backend uses cookies for auth tokens
});

export default api;