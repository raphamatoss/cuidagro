export interface Sintoma {
    sintoma: string;
}

export interface SintomaFormDTO {
    cpf: string;
    sintomas: Sintoma[];
}

export interface DiagnosisResponse {
    diagnostico: string;
    cid: string;
    risco: string;
    descricao: string;
}