/**
 * Valida um número de CPF brasileiro.
 *
 * O CPF é validado seguindo estas regras:
 * 1. Remove todos os caracteres não numéricos do valor fornecido.
 * 2. Verifica se o CPF é vazio ou se não possui exatamente 11 dígitos.
 * 3. Verifica se todos os dígitos do CPF são iguais (ex.: "111.111.111-11"), o que é inválido.
 * 4. Calcula e valida o primeiro dígito verificador (d1) com base nos 9 primeiros dígitos.
 * 5. Calcula e valida o segundo dígito verificador (d2) com base nos 10 primeiros dígitos.
 *
 * O cálculo dos dígitos verificadores segue o algoritmo oficial:
 * - Para o primeiro dígito (d1), soma-se o produto de cada um dos 9 primeiros dígitos por um peso decrescente de 10 a 2.
 * - Para o segundo dígito (d2), soma-se o produto de cada um dos 10 primeiros dígitos por um peso decrescente de 11 a 2.
 * - Em ambos os casos, o resultado da soma é multiplicado por 10 e o resto da divisão por 11 é comparado ao dígito correspondente.
 * - Se o resto for 10, o dígito verificador é considerado 0.
 *
 * @param value - O valor do CPF a ser validado.
 * @returns Uma mensagem de erro em caso de CPF inválido ou `null` se o CPF for válido.
 */

export const isValidCPF = (cpf: string) => {
    const cleanCPF = cpf.replace(/\D/g, '');

    if (cleanCPF.length !== 11) return false;
    if (/^(\d)\1+$/.test(cleanCPF)) return false;

    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += Number(cleanCPF[i]) * (10 - i);
    }

    let firstDigit = (sum * 10) % 11;
    if (firstDigit === 10) firstDigit = 0;
    if (firstDigit !== Number(cleanCPF[9])) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += Number(cleanCPF[i]) * (11 - i);
    }

    let secondDigit = (sum * 10) % 11;
    if (secondDigit === 10) secondDigit = 0;

    return secondDigit === Number(cleanCPF[10]);
};
