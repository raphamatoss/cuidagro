import type { Validator } from '../types/register';

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

export const validateCPF: Validator = (value) => {
    const cpf = value.replace(/\D/g, '');

    if (!cpf) return 'CPF é obrigatório';
    if (cpf.length !== 11) return 'CPF inválido';
    if (/^(\d)\1+$/.test(cpf)) return 'CPF inválido';

    let sum = 0;
    for (let i = 0; i < 9; i++) sum += +cpf[i] * (10 - i);
    let d1 = (sum * 10) % 11;
    if (d1 === 10) d1 = 0;
    if (d1 !== +cpf[9]) return 'CPF inválido';

    sum = 0;
    for (let i = 0; i < 10; i++) sum += +cpf[i] * (11 - i);
    let d2 = (sum * 10) % 11;
    if (d2 === 10) d2 = 0;
    if (d2 !== +cpf[10]) return 'CPF inválido';

    return null;
};
