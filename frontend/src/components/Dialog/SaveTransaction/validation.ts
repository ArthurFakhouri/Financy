import z from "zod";

export const saveTransactionSchema = z.object({
  type: z.enum(["expense", "revenue"]),
  description: z.string().min(1, "A descrição é obrigatória"),
  date: z.date({ error: "Informe a data da transação" }),
  value: z.string().min(1, "O valor é obrigatório"),
  category: z.string().min(1, "A categoria é obrigatória"),
})

export type SaveTransactionProps = z.infer<typeof saveTransactionSchema>