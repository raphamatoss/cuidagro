import type { Validator } from '../types/register';

/**
 * Valida uma senha com base em regras específicas:
 *
 * - A senha é obrigatória.
 * - Deve conter no mínimo 8 caracteres.
 * - Deve incluir pelo menos uma letra maiúscula.
 * - Deve incluir pelo menos uma letra minúscula.
 * - Deve incluir pelo menos um número.
 * - Deve incluir pelo menos um caractere especial (!@#$%^&*).
 *
 * @param value - A senha a ser validada.
 * @returns Uma mensagem de erro descrevendo a regra violada, ou
 *          Retorna `null` se a senha for válida.
 */

export const validatePassword: Validator = (value) => {
    if (!value) return 'Senha é obrigatória';
    if (value.length < 8) return 'Mínimo 8 caracteres';
    if (!/[A-Z]/.test(value)) return 'Use letra maiúscula';
    if (!/[a-z]/.test(value)) return 'Use letra minúscula';
    if (!/\d/.test(value)) return 'Use um número';
    if (!/[!@#$%^&*]/.test(value)) return 'Use caractere especial';
    return null;
};


/**
 * Validador para confirmar se o valor fornecido corresponde à senha no formulário.
 *
 * @param value - O valor do campo de confirmação de senha.
 * @param form - O formulário contendo os valores dos campos, incluindo a senha.
 * @returns Uma mensagem de erro se o campo de confirmação estiver vazio ou se as senhas não coincidirem.
 *          Retorna `null` se a validação for bem-sucedida.
 */

export const validateConfirmPassword: Validator = (value, form) => {
    if (!value) return 'Confirme a senha';
    if (value !== form.password) return 'Senhas não coincidem';
    return null;
};
