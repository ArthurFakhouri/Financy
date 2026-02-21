import z from "zod";

export const updateProfileSchema = z.object({
  full_name: z.string().min(2, 'Informe seu nome completo'),
  email: z.email(),
})

export type UpdateProfileProps = z.infer<typeof updateProfileSchema>