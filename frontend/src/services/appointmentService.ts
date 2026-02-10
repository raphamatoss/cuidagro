import { api } from './api';
import type { Appointment, ConsultaDTO } from '../types/appointment';

export const appointmentService = {
    getAll: async (cpf: string): Promise<Appointment[]> => {
        const response = await api.get<ConsultaDTO[]>(
            `/consultas/historico?cpf=${cpf}`,
        );

        if (!response.data) return [];

        return response.data.map((consulta) => ({
            id: consulta.id,
            medico: {
                nome: consulta.medico?.nome || 'Médico não informado',
                especialidade: consulta.medico?.especialidade || 'Clínico Geral',
            },
            data: formatarData(consulta.data),
            hora: consulta.hora,
            status: consulta.status,
        }));
    },
};

function formatarData(dataISO: string): string {
    if (!dataISO) return '--/--/----';
    const [ano, mes, dia] = dataISO.split('-');
    return `${dia}/${mes}/${ano}`;
}
