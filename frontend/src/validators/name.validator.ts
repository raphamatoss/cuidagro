import type { Validator } from '../types/register';

/**
 * Valida uma string de nome com base nas seguintes regras:
 * - Não deve estar vazio ou consistir apenas de espaços em branco.
 * - Deve conter pelo menos duas palavras (por exemplo, nome e sobrenome).
 * - Deve incluir apenas caracteres alfabéticos (incluindo caracteres acentuados) e espaços.
 *
 * @param value - A string de nome a ser validada.
 * @returns Uma mensagem de erro de validação se o nome for inválido, ou `null` se o nome for válido.
 */

export const validateName: Validator = (value) => {
    if (!value.trim()) return 'Nome é obrigatório';
    if (value.trim().split(/\s+/).length < 2)
        return 'Nome deve conter pelo menos nome e sobrenome';
    if (!/^[A-Za-zÀ-ÿ\s]+$/.test(value)) return 'Nome inválido';
    return null;
};
