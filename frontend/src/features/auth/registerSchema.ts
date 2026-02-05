import { z } from 'zod';
import { isValidCPF } from '../../validators/cpf.validator';
import { isAdult } from '../../validators/birthDate.validator';

export const registerSchema = z
    .object({
        name: z
			.string()
			.min(1, "Por favor, insira seu nome completo")
            .trim()
            .min(3, 'Por favor, insira seu nome completo')
            .refine((name) => /^[\p{L} ]+$/u.test(name), {
                message:
                    'O nome não pode conter números ou caracteres especiais',
            })
            .refine((name) => name.split(' ').length >= 2, {
                message: 'Por favor, insira seu nome completo',
            })
            .transform((name) =>
                name
                    .split(' ')
                    .map((word) => word[0].toUpperCase() + word.slice(1))
                    .join(' '),
            ),

        cpf: z
            .string()
			.min(1, "Por favor, insira seu CPF")
            .transform((cpf) => cpf.replace(/\D/g, ''))
            .refine(cpf => cpf.length > 0, {
				message: "Por favor, insira o seu CPF",
			})
            .refine((cpf) => isValidCPF(cpf), {
                message: 'CPF inválido, verifique o número digitado',
            }),

        birthDate: z
            .string()
            .min(1, 'Por favor, informe sua data de nascimento')
            .refine((date) => !isNaN(Date.parse(date)), {
                message: 'Data inválida',
            })
            .refine(isAdult, {
                message: 'É necessário ter pelo menos 18 anos',
            }),

        email: z
            .string()
            .min(1, 'Por favor, insira um e-mail válido')
            .email('Formato de e-mail inválido')
            .transform((email) => email.toLowerCase()),

        phone: z
            .string()
            .transform((phone) => phone.replace(/\D/g, ''))
            .refine((phone) => phone.length === 11, {
                message: 'Telefone inválido, verifique o número digitado',
            }),

        password: z
            .string()
            .min(8, 'A senha deve ter pelo menos 8 caracteres')
            .refine((pwd) => /[A-Z]/.test(pwd), {
                message: 'A senha deve conter ao menos uma letra maiúscula',
            })
            .refine((pwd) => /[a-z]/.test(pwd), {
                message: 'A senha deve conter ao menos uma letra minúscula',
            })
            .refine((pwd) => /\d/.test(pwd), {
                message: 'A senha deve conter ao menos um número',
            })
            .refine((pwd) => /[@$!%*?&#]/.test(pwd), {
                message: 'A senha deve conter um caractere especial',
            }),

        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'As senhas devem ser idênticas. Por favor, confira novamente.',
        path: ['confirmPassword'],
    });

export type RegisterFormData = z.infer<typeof registerSchema>;
