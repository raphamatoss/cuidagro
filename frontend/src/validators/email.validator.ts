import type { Validator } from '../types/register';

/**
 * Valida um endereço de e-mail.
 * - Não deve estar vazio ou consistir apenas de espaços em branco.
 * - Deve estar na estrutura correta de email (com @ e '.')
 *
 * @param value - O endereço de e-mail a ser validado.
 * @returns Uma string com uma mensagem de erro se o e-mail for inválido ou estiver ausente,
 *          ou `null` se o e-mail for válido.
 */

export const validateEmail: Validator = (value) => {
    if (!value) return 'E-mail é obrigatório';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'E-mail inválido';
    return null;
};
