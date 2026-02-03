import type { Validator } from '../types/register';

/**
 * Valida uma data de nascimento fornecida.
 * - A data de nascimento é obrigatória.
 * - A data não pode ser maior que a data atual.
 * - O usuário deve ter pelo menos 18 anos.
 *
 * @param value - A data de nascimento em formato de string.
 *                Caso seja `null` ou `undefined`, será retornada uma mensagem de erro.
 * @returns Uma mensagem de erro caso falhe em algum teste, ou
 *          Retorna `null` se a data for válida.
 */

export const validateBirthDate: Validator = (value) => {
    if (!value) return 'Data de nascimento é obrigatória';

    const birth = new Date(value);
    const today = new Date();

    if (birth > today) return 'Data inválida';

    const age =
        today.getFullYear() -
        birth.getFullYear() -
        (today <
        new Date(today.getFullYear(), birth.getMonth(), birth.getDate())
            ? 1
            : 0);

    if (age < 18) return 'É necessário ter 18 anos';

    return null;
};
