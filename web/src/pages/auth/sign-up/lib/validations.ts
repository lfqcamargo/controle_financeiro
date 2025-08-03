import { z } from "zod";

export const signUpSchema = z
  .object({
    name: z
      .string()
      .min(3, "Nome do usuário deve ter pelo menos 3 caracteres")
      .max(255, "Nome do usuário deve ter no máximo 255 caracteres")
      .regex(
        /^[\p{L}]+([\p{L}\s']+)?$/u,
        "Nome do usuário deve conter apenas letras e espaços"
      )
      .transform((name) => name.trim().replace(/\s+/g, " "))
      .transform((name) =>
        name.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())
      ),

    email: z
      .string()
      .email("Formato de email inválido")
      .min(5, "Email deve ter pelo menos 5 caracteres")
      .max(255, "Email deve ter no máximo 255 caracteres")
      .transform((email) => email.toLowerCase().trim()),

    password: z
      .string()
      .min(8, "Senha deve ter pelo menos 8 caracteres")
      .max(20, "Senha deve ter no máximo 20 caracteres")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
        "Senha deve conter pelo menos uma letra maiúscula, uma minúscula, um número e um caractere especial"
      ),

    confirmPassword: z.string().min(1, "Confirmação de senha é obrigatória"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;
