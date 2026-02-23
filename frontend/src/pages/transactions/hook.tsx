import type { CellContext } from "@tanstack/react-table";
import { isSameMonth, parseISO } from "date-fns";
import { Info, SquarePen, Trash } from "lucide-react";
import { useContext, useMemo, useState } from "react";
import { toast } from "sonner";
import { Alert } from "@/components/Alert";
import { ButtonIcon } from "@/components/Button/Icon";
import { ButtonLabel } from "@/components/Button/Label";
import { DialogSaveTransaction } from "@/components/Dialog/SaveTransaction";
import type { SelectItemProps } from "@/components/SelectLabel";
import { transactionColumns } from "@/components/TransactionsTable/columns";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AuthContext } from "@/context/auth";
import { apolloClient } from "@/lib/graphql/apollo";
import { DELETE_TRANSACTION } from "@/lib/graphql/mutations/transaction";
import type { TransactionProps } from "@/types/transaction";

export function useTransactions() {
  const { transactions, categories, refetchTransaction } =
    useContext(AuthContext);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    type: "all",
    category: "all",
    period: "all",
  });

  const transactionColumnsCustom = useMemo(() => {
    async function handleDeleteTransaction(transaction: TransactionProps) {
      try {
        setIsLoading(true);
        const { data } = await apolloClient.mutate<boolean, { id: string }>({
          mutation: DELETE_TRANSACTION,
          variables: {
            id: transaction.id,
          },
        });

        if (data) {
          toast.success(
            `Transação '${transaction.description}' deletada com sucesso!`,
          );
          refetchTransaction();
          setOpenDeleteModal(false);
        }
      } catch (err) {
        toast.error("Não foi possível deletar a transação", {
          description: `${err}`,
        });
      } finally {
        setIsLoading(false);
      }
    }

    return transactionColumns.map((transactionColumn) => {
      if (transactionColumn.id === "actions") {
        return {
          ...transactionColumn,
          cell: ({ row }: CellContext<TransactionProps, unknown>) => {
            return (
              <div className="flex items-center gap-2">
                <Alert
                  open={openDeleteModal}
                  onOpenChange={setOpenDeleteModal}
                  trigger={
                    <ButtonIcon>
                      <Trash className="size-4 text-danger" />
                    </ButtonIcon>
                  }
                >
                  <Info className="size-12 text-danger" />
                  <div className="flex flex-col items-center justify-center gap-2">
                    <AlertDialogTitle className="font-bold md:text-2xl md:leading-[32px] text-center text-gray-800">
                      Tem certeza que deseja excluir a transação?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-sm leading-[20px] text-center text-gray-600">
                      Você está para excluir a transação{" "}
                      <strong>{row.original.description}</strong>
                    </AlertDialogDescription>
                  </div>
                  <div className="w-full flex items-center gap-2 mt-4">
                    <AlertDialogCancel asChild>
                      <ButtonLabel className="flex-1" disabled={isLoading}>
                        Cancelar
                      </ButtonLabel>
                    </AlertDialogCancel>
                    <AlertDialogAction asChild>
                      <ButtonLabel
                        className="flex-1 bg-red-base hover:bg-red-dark"
                        disabled={isLoading}
                        onClick={() => handleDeleteTransaction(row.original)}
                      >
                        Excluir
                      </ButtonLabel>
                    </AlertDialogAction>
                  </div>
                </Alert>
                <DialogSaveTransaction transaction={row.original}>
                  <ButtonIcon>
                    <SquarePen className="size-4 text-gray-700" />
                  </ButtonIcon>
                </DialogSaveTransaction>
              </div>
            );
          },
        };
      }
      return transactionColumn;
    });
  }, [isLoading, openDeleteModal, refetchTransaction]);

  function handleChangeFilter(key: keyof typeof filters, value: any) {
    setFilters((state) => {
      return {
        ...state,
        [key]: value,
      };
    });
  }

  const { periods, typeFilters, categoryFilters } = useMemo(() => {
    const typeFilters = [
      {
        label: "Todas",
        value: "all",
      },
      {
        label: "Entrada",
        value: "revenue",
      },
      {
        label: "Saída",
        value: "expense",
      },
    ];
    const categoryFilters = [
      {
        label: "Todas",
        value: "all",
      },
      ...categories.map((category) => {
        return {
          label: category.title,
          value: category.id,
        } as SelectItemProps;
      }),
    ];

    const transactionDates = [
      Date.now(),
      ...transactions.map((transaction) =>
        new Date(transaction.date).getTime(),
      ),
    ];
    const minTransactionDate = new Date(Math.min(...transactionDates));

    let minYear = minTransactionDate.getFullYear();
    let minMonth = minTransactionDate.getMonth();

    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();

    const periods = [];

    while (
      minYear < currentYear ||
      (minYear === currentYear && minMonth <= currentMonth)
    ) {
      const data = new Date(minYear, minMonth, 1);

      periods.push({
        value: data.toISOString(), // ou `${ano}-${mes + 1}`
        label: `${data.toLocaleString("pt-BR", { month: "long" })} / ${minYear}`,
      });

      minMonth++;
      if (minMonth > 11) {
        minMonth = 0;
        minYear++;
      }
    }
    periods.push({
      value: "all",
      label: "Todas"
    })
    periods.reverse();

    return {
      periods,
      typeFilters,
      categoryFilters,
    };
  }, [transactions, categories]);

  const filteredTransactions = useMemo(() => {
    const transactionsBySearch = transactions.filter((transaction) =>
      transaction.description.toLowerCase().includes(filters.search.toLowerCase()),
    );
    const transactionsByType =
      filters.type === "all"
        ? transactionsBySearch
        : transactionsBySearch.filter(
          (transaction) => transaction.type === filters.type,
        );
    const transactionsByCategory =
      filters.category === "all"
        ? transactionsByType
        : transactionsByType.filter(
          (transaction) => transaction.category.id === filters.category,
        );
    const transactionsByPeriod = filters.period === 'all' ?
      transactionsByCategory
      : transactionsByCategory.filter((transaction) =>
        isSameMonth(parseISO(transaction.date), filters.period),
      );

    return transactionsByPeriod
  }, [transactions, filters]);

  return {
    filters,
    periods,
    typeFilters,
    categoryFilters,
    filteredTransactions,
    transactionColumnsCustom,
    handleChangeFilter,
  };
}
