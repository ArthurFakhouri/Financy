"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { categoryIcons } from "@/constants/categoryIcons";
import type { TransactionProps } from "@/types/transaction";
import { CategoryIcons } from "../CategoryIcons";
import { Type } from "../Type";

export const transactionColumns: ColumnDef<TransactionProps>[] = [
  {
    accessorKey: "description",
    header: "Descrição",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-4 font-medium text-gray-800">
          <div
            className="size-10 rounded-[8px] flex items-center justify-center"
            style={{
              backgroundColor: `var(--color-${row.original.category.color}-light)`,
              color: `var(--color-${row.original.category.color}-base)`,
            }}
          >
            <CategoryIcons icon={row.original.category.icon} className="size-4" />
          </div>
          {row.original.description}
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Data",
    cell: ({ row }) => {
      return (
        <span className="text-sm leading-[20px] text-gray-600">
          {format(row.original.date, "dd/MM/yy")}
        </span>
      );
    },
    size: 112,
  },
  {
    accessorKey: "category",
    header: "Categoria",
    cell: ({ row }) => {
      return (
        <div
          className="flex items-center gap-4 w-fit px-3 py-1 rounded-full font-medium text-sm leading-[20px]"
          style={{
            backgroundColor: `var(--color-${row.original.category.color}-light)`,
            color: `var(--color-${row.original.category.color}-base)`,
          }}
        >
          {row.original.category.title}
        </div>
      );
    },
    size: 200,
  },
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row }) => {
      return <Type type={row.original.type} />;
    },
    size: 136,
  },
  {
    accessorKey: "value",
    header: "Valor",
    cell: ({ row }) => {
      const value = row.original.value;
      const valueSigned = row.original.type === "expense" ? value * -1 : value;

      const valueNumber = Number(valueSigned) / 100;

      const valueFormatted = valueNumber.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });

      return (
        <span className="text-gray-800 text-sm font-semibold leading-[20px]">
          {valueFormatted.replace(/(\+|-)/, "$1 ")}
        </span>
      );
    },
    size: 200,
  },
  {
    id: "actions",
    header: "Ações",
    size: 120,
  },
];
