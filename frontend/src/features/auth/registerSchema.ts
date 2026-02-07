import { z } from 'zod';
import { isValidCPF } from '../../validators/cpf.validator';
import { isAdult } from '../../validators/birthDate.validator';

const UserRoleEnum = z.enum(['AGRICULTOR', 'MEDICO', 'AGENTE_SAUDE'], {
    error: 'Por favor, selecione um perfil.',
});

export const registerSchema = z
    .object({
        role: UserRoleEnum,

        professionalId: z.string().optional(),

        name: z
            .string()
            .min(1, { error: 'Por favor, insira seu nome completo' })
            .trim()
            .min(3, { error: 'Por favor, insira seu nome completo' })
            .refine((name) => /^[\p{L} ]+$/u.test(name), {
                error: 'O nome não pode conter números ou caracteres especiais',
            })
            .refine((name) => name.split(' ').length >= 2, {
                error: 'Por favor, insira seu nome completo',
            })
            .transform((name) =>
                name
                    .split(' ')
                    .map((word) => word[0].toUpperCase() + word.slice(1))
                    .join(' '),
            ),

        cpf: z
            .string()
            .min(1, { error: 'Por favor, insira seu CPF' })
            .transform((cpf) => cpf.replace(/\D/g, ''))
            .refine((cpf) => cpf.length > 0, {
                error: 'Por favor, insira o seu CPF',
            })
            .refine((cpf) => isValidCPF(cpf), {
                error: 'CPF inválido, verifique o número digitado',
            }),

        birthDate: z
            .string()
            .min(1, { error: 'Por favor, informe sua data de nascimento' })
            .refine((date) => !isNaN(Date.parse(date)), {
                error: 'Data inválida',
            })
            .refine(isAdult, { error: 'É necessário ter pelo menos 18 anos' }),

        email: z
            .email({ error: 'Formato de e-mail inválido' })
            .transform((email) => email.toLowerCase()),

        phone: z
            .string()
            .transform((phone) => phone.replace(/\D/g, ''))
            .refine((phone) => phone.length >= 10, {
                error: 'Telefone inválido, verifique o número digitado',
            }),

        password: z
            .string()
            .min(8, { error: 'A senha deve ter pelo menos 8 caracteres' })
            .refine((pwd) => /[A-Z]/.test(pwd), {
                error: 'Maiúscula obrigatória',
            })
            .refine((pwd) => /[a-z]/.test(pwd), {
                error: 'Minúscula obrigatória',
            })
            .refine((pwd) => /\d/.test(pwd), { error: 'Número obrigatório' })
            .refine((pwd) => /[@$!%*?&#]/.test(pwd), {
                error: 'Caractere especial obrigatório',
            }),

        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        error: 'As senhas devem ser idênticas.',
        path: ['confirmPassword'],
    })
    .superRefine((data, ctx) => {
        if (data.role !== 'AGRICULTOR') {
            if (!data.professionalId || data.professionalId.length < 3) {
                ctx.addIssue({
                    code: "custom",
                    message:
                        'Registro profissional é obrigatório para este perfil',
                    path: ['professionalId'],
                });
            }
        }
    });

export type RegisterFormData = z.infer<typeof registerSchema>;
