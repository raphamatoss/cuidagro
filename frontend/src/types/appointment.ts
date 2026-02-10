export type AppointmentStatus = 'PENDENTE' | 'AGENDADA' | 'CANCELADA' | 'CONCLUIDA';

export interface Local {
    rua: string;         
    numero: string;
    bairro: string;     
    cidade: string;
    estado: string;
    cep: string;
    complemento?: string;
}

export interface Medico {
    cpf: string;
    nome: string;
    especialidade: string;
    crm?: string;
}

export interface Agricultor {
    cpf: string;
}

export interface Appointment {
    diaHora: string;
    local: Local;
    medico: Medico;
    agricultor: Agricultor;
    status: AppointmentStatus;
}