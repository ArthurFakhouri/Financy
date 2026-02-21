import z from "zod";

export const signUpSchema = z.object({
  full_name: z.string().min(3, 'Informe o nome completo'),
  email: z.email({ error: "Informe um e-mail válido" }),
  password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
})

export type SignUpProps = z.infer<typeof signUpSchema>