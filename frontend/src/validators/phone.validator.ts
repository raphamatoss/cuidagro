import type { Validator } from '../types/register';

/**
 * Valida um número de telefone com as seguintes regras:
 * - Deve conter apenas números
 * - Não deve estar vazio
 * - Deve conter 11 dígitos [99_911112222]
 *
 * @param value - O valor a ser validado como número de telefone.
 * @returns Uma mensagem de erro em caso de falhe em algum teste ou `null` se o número for válido.
 */
export const validatePhone: Validator = (value) => {
    const phone = value.replace(/\D/g, '');
    if (!phone) return 'Telefone é obrigatório';
    if (phone.length < 10 || phone.length > 11) return 'Telefone inválido';
    return null;
};
