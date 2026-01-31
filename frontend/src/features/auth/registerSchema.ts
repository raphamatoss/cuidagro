import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string()
    .min(3, "O nome deve ter pelo menos 3 letras")
    .transform(name => {
      return name.trim().split(' ').map(word => {
        return word[0].toLocaleUpperCase().concat(word.substring(1))
      }).join(' ');
    }), // Formata para Capitalize automaticamente
  
  cpf: z.string()
    .min(11, "CPF inválido")
    .max(14, "CPF inválido"), // Aceita com ou sem pontuação por enquanto
  
  birthDate: z.string()
    .refine((date) => new Date(date).toString() !== 'Invalid Date', {
      message: "Data inválida"
    }),

  email: z.string()
    .min(1, "O e-mail é obrigatório")
    .email("Formato de e-mail inválido"),

  phone: z.string()
    .min(10, "Telefone inválido"), // Ex: (11) 99999-9999

  password: z.string()
    .min(6, "A senha deve ter pelo menos 6 caracteres"),

  confirmPassword: z.string()
    .min(6, "A confirmação é obrigatória"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não conferem",
  path: ["confirmPassword"], // O erro vai aparecer no campo de confirmação
});

export type RegisterFormData = z.infer<typeof registerSchema>;