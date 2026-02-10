/**
 * Define máscaras de formatação para número de CPF e número de telefone fornecidos.
 * 
 * @param value - Uma string contendo o valor do campo.
 * @returns Uma string formatada no padrão correto.
 */

export const maskCPF = (value: string): string => {
    const digits = value.replace(/\D/g, '').slice(0, 11);

    return digits
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
};

export const maskPhone = (value: string): string => {
    const digits = value.replace(/\D/g, '').slice(0, 11);

    return digits
        .replace(/^(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2');
};
