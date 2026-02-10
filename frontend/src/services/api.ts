import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://3.19.127.120:9090',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('Erro na requisição API:', error.response);
        return Promise.reject(error);
    },
);
