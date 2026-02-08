import { api } from './api';
import type { AuthResponse, LoginDTO, RegisterDTO } from '../types/auth';

export const authService = {
    register: async (payload: RegisterDTO) => {
        const response = await api.post('/auth/register', payload);
        return response.data;
    },

    login: async (credentials: LoginDTO): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>('/auth/login', credentials)
        return response.data;
    },
};

