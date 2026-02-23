import z from "zod";

export const saveCategorySchema = z.object({
  title: z.string().min(1, "O título é obrigatório"),
  description: z.string().optional(),
  icon: z.string().min(1, "O ícone é obrigatório"),
  color: z.string().min(1, "A cor é obrigatória"),
})

export type SaveCategoryProps = z.infer<typeof saveCategorySchema>