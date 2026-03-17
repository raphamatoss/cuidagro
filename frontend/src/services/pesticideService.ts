import { api } from './api';
import type { Pesticide, PesticideFormDTO } from '../types/pesticide';

export const pesticideService = {
    getAll: async (): Promise<Pesticide[]> => {
        const response = await api.get<Pesticide[]>('/agrotoxicos');
        return response.data;
    },

    submitForm: async (payload: PesticideFormDTO): Promise<void> => {
        await api.post('/agrotoxicos/forms', payload);
    }
};
