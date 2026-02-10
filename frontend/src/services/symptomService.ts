import { api } from './api';
import type { Sintoma, SintomaFormDTO, DiagnosisResponse } from '../types/symptom';

export const symptomService = {
    getAll: async (): Promise<Sintoma[]> => {
        const response = await api.get<Sintoma[]>('/sintomas');
        return response.data;
    },

    sendForm: async (payload: SintomaFormDTO): Promise<DiagnosisResponse> => {
        const response = await api.post<DiagnosisResponse>('/sintomas/forms', payload);
        return response.data;
    }
};