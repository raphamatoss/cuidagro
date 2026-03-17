export type UserRole = 'AGRICULTOR' | 'MEDICO' | 'AGENTE_SAUDE';

// Dados de REGISTRO (envio)
export interface RegisterDTO {
    nome: string;
    email: string;
    cpf: string;
    numero: string;
    dataNascimento: string;
    senha: string;
    papel: UserRole;
    crm?: string | null;
    especialidade?: string | null;
}

// Dados de LOGIN (envio)
export interface LoginDTO {
    login: string;
    senha: string;
}

// Dados de USUÁRIO (recebe)
export interface AuthResponse {
    token: string;
    cpf: string;
    nome: string;
    email: string;
    papel: UserRole;
}
