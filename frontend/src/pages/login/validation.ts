import { z } from 'zod'
export const loginSchema = z.object({
  email: z.email({ error: "Informe um e-mail válido" }),
  password: z.string().trim(),
  rememberMe: z.boolean(),
})

export type LoginProps = z.infer<typeof loginSchema>