import type { CategoryProps } from "./category"

export type TransactionProps = {
  id: string
  description: string
  type: "expense" | "revenue"
  date: string
  value: number
  category: CategoryProps
  category_id: string
  created_at: Date
  updated_at: Date
}