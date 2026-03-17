export interface Disease {
    nome: string;
}

export interface HealthDataDTO {
    cpf: string;
    peso: number;
    altura: number;
    doencas: Disease[];
}