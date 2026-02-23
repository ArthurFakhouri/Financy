import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./data-table";

export type TransactionsTableProps<T> = {
  data: T[]
  columns: ColumnDef<T>[]
}

export function TransactionsTable<T>({
  data,
  columns,
}: TransactionsTableProps<T>) {
  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}