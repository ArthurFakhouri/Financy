import type { TransactionProps } from "./transaction"

export type CategoryProps = {
  id: string
  title: string
  description: string
  icon: string
  color: string
  transactions: Pick<TransactionProps, 'id'>[]
  created_at: Date
  updated_at: Date
}