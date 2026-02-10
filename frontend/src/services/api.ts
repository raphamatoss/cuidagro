import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://52.202.29.119:9090',
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
