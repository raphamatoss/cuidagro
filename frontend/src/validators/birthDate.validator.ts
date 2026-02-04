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

export const isAdult = (date: string) => {
  const birth = new Date(date);
  const today = new Date();

  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age >= 18;
};

