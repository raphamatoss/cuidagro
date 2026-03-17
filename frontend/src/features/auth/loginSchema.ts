import { z } from 'zod';

export const loginSchema = z.object({
    login: z
        .email('Insira um e-mail válido')
        .trim()
        .min(1, 'O e-mail é obrigatório')
        .transform((email) => email.toLowerCase()),

    senha: z
        .string()
        .min(1, 'A senha é obrigatória')
        //.min(8, 'A senha deve ter pelo menos 8 caracteres'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
