"use client";

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getPaginationButtons } from "@/utils/pagination";
import { ButtonPagination } from "../Button/Pagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const { pageIndex, pageSize } = table.getState().pagination;

  const total = table.getPrePaginationRowModel().rows.length;

  const start = pageIndex * pageSize + 1;
  const end = Math.min((pageIndex + 1) * pageSize, total);

  const pageCount = table.getPageCount();

  const currentPage = pageIndex + 1;
  const paginationButtons = getPaginationButtons(currentPage, pageCount);

  return (
    <div className="bg-white rounded-[12px] border border-gray-200">
      <div className="overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="px-6 py-5 text-gray-500 uppercase text-xs font-medium tracking-[0.6px]"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-6 py-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Sem resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="py-5 px-6 border-t border-t-gray-200 flex flex-wrap items-center justify-between gap-4">
        <span className="text-sm text-gray-700">
          <span className="font-medium">{start > end ? end : start}</span> a{" "}
          <span className="font-medium">{end}</span> |{" "}
          <span className="font-medium">{total}</span> resultados
        </span>
        <div className="flex items-center gap-2">
          <ButtonPagination disabled={!table.getCanPreviousPage()}>
            <ChevronLeft className="size-4" />
          </ButtonPagination>
          {paginationButtons.map((paginationButton) => {
            return (
              <ButtonPagination
                key={`page:${paginationButton}`}
                active={pageIndex + 1 === paginationButton}
              >
                {paginationButton}
              </ButtonPagination>
            );
          })}
          <ButtonPagination disabled={!table.getCanNextPage()}>
            <ChevronRight className="size-4" />
          </ButtonPagination>
        </div>
      </div>
    </div>
  );
}
