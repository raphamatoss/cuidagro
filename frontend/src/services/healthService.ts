import { api } from './api';
import type { Disease, HealthDataDTO } from '../types/health';

export const healthService = {
    // Busca a lista de doenças para montar os checkboxes
    getAvailableDiseases: async (): Promise<Disease[]> => {
        const response = await api.get<Disease[]>('/minha-saude');
        return response.data || [];
    },

    // Salva ou Atualiza
    saveHealthData: async (data: HealthDataDTO): Promise<void> => {
        await api.post('/minha-saude/forms', data);
    },
};
