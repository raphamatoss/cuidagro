import { api } from './api';
import type { Appointment } from '../types/appointment';

export const appointmentService = {
    getAll: async (cpf: string): Promise<Appointment[]> => {
        const response = await api.get<Appointment[]>(
            `/consultas/historico?cpf=${cpf}`,
        );
        return response.data || [];
    },

    schedule: async (consulta: Appointment): Promise<void> => {
        await api.post('/consultas/agendar', consulta);
    },

    cancel: async (consulta: Appointment): Promise<void> => {
        await api.post('/consultas/cancelar', consulta);
    },
};
