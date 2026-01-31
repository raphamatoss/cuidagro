import axios from 'axios';
import type { LoginFormData } from '../features/auth/loginSchema';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
});

export const authService = {
  login: async (credentials: LoginFormData) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  }
};