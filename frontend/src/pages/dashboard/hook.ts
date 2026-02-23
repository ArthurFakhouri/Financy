import { isSameMonth, parseISO } from "date-fns";
import { useContext, useMemo } from "react";
import { AuthContext } from "@/context/auth";

export function useDashboard() {
  const { transactions, categories } = useContext(AuthContext);

  const {
    totalBalance,
    totalRevenueCurrMonth,
    totalExpenseCurrMonth,
  } = useMemo(() => {
    const listTransactionExpense = transactions.filter(
      (transaction) => transaction.type === "expense",
    );
    const listTransactionRevenue = transactions.filter(
      (transaction) => transaction.type === "revenue",
    );

    const totalExpense = listTransactionExpense.reduce(
      (acc, transaction) => acc + transaction.value,
      0,
    );
    const totalRevenue = listTransactionRevenue.reduce(
      (acc, transaction) => acc + transaction.value,
      0,
    );

    const totalBalance = totalRevenue - totalExpense;

    const listTransactionRevenueCurrMonth = listTransactionRevenue.filter(
      (transaction) => isSameMonth(parseISO(transaction.date), new Date()),
    );

    const totalRevenueCurrMonth = listTransactionRevenueCurrMonth.reduce(
      (acc, transaction) => acc + transaction.value,
      0,
    );

    const listTransactionExpenseCurrMonth = listTransactionExpense.filter(
      (transaction) => isSameMonth(parseISO(transaction.date), new Date()),
    );

    const totalExpenseCurrMonth = listTransactionExpenseCurrMonth.reduce(
      (acc, transaction) => acc + transaction.value,
      0
    )

    return {
      totalBalance,
      totalRevenueCurrMonth,
      totalExpenseCurrMonth
    };
  }, [transactions]);

  function formatValue(value: number) {
    const valueNumber = Number(value) / 100;

    const valueFormatted = valueNumber.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    return valueFormatted
  }

  function formatValueByType(type: 'expense' | 'revenue', value: number) {
    if (type === 'expense') {
      value = value * -1
    }
    return formatValue(value).replace(/(\+|-)/, "$1 ")
  }

  const recentTransactions = useMemo(() => {
    return transactions.filter((_, index) => index < 5)
  }, [transactions])

  const categoriesWithMoreTransactions = useMemo(() => {
    return [...categories]
      .sort((a, b) => b.transactions.length - a.transactions.length)
      .filter((_, index) => index < 5)
  }, [categories])

  return {
    totalBalance,
    recentTransactions,
    totalRevenueCurrMonth,
    totalExpenseCurrMonth,
    categoriesWithMoreTransactions,
    formatValue,
    formatValueByType,
  };
}
