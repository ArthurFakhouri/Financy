import type { CategoryProps } from "./category"

export type TransactionProps = {
  id: string
  description: string
  type: "expense" | "revenue"
  date: Date
  value: number
  category: CategoryProps
  created_at: Date
  updated_at: Date
}