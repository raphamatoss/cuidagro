import { api } from './api';
import type { UserProfile } from '../types/user';

export const userService = {
    getProfile: async (): Promise<UserProfile> => {
        const response = await api.get('/usuarios/1');
        return response.data;
    },
};
