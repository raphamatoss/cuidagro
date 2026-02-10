export type AppointmentStatus = 'PENDENTE' | 'AGENDADA' | 'CANCELADA' | 'CONCLUIDA';

export interface Doctor {
    nome: string;
    especialidade: string;
}

export interface Appointment {
    id: number;
    medico: Doctor;
    data: string;       
    hora: string;       
    status: AppointmentStatus;
}

export interface ConsultaDTO {
    id: number;
    hora: string;
    data: string;
    status: AppointmentStatus;     
    medico: Doctor;
    agricultor?: string;
    local?: string;
}