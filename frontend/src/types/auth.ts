export type UserRole = 'AGRICULTOR' | 'MEDICO' | 'AGENTE_SAUDE';

// Dados de REGISTRO (envio)
export interface RegisterDTO {
    name: string;
    email: string;
    cpf: string;
    phone: string;
    birthDate: string;
    password: string;
    userRole: UserRole;
    professionalId?: string | null;
}

// Dados de LOGIN (envio)
export interface LoginDTO {
    email: string;
    password: string;
}

// Dados de USUÁRIO (recebe)
export interface AuthResponse {
  token: string;
  usuario: {
    id: number;
    nome: string;
    email: string;
    tipoUsuario: UserRole;
  }
}
