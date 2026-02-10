// Dados do agrotóxico (get)
export interface Pesticide {
    nome: string;
    classe: string;
}

// Dados dos agrotóxicos enviados pelo usuário (post)
export interface PesticideFormDTO {
    cpf: string;
    agrotoxicos: Pesticide[]; 
    outro?: string;
}