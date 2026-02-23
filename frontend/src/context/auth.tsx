import { useQuery } from "@apollo/client/react";
import { createContext, type ReactNode, useEffect, useState } from "react";
import { LIST_CATEGORIES } from "@/lib/graphql/queries/category";
import { LIST_TRANSACTIONS } from "@/lib/graphql/queries/transaction";
import type { CategoryProps } from "@/types/category";
import type { TransactionProps } from "@/types/transaction";

export type AuthContextProps = {
  transactions: TransactionProps[];
  categories: CategoryProps[];
  refetchCategory: () => void
  refetchTransaction: () => void
};

export const AuthContext = createContext({} as AuthContextProps);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [transactions, setTransactions] = useState<TransactionProps[]>([]);
  const [categories, setCategories] = useState<CategoryProps[]>([]);

  const { data: transactionData, refetch: refetchTransaction } = useQuery<{
    listTransaction: TransactionProps[];
  }>(LIST_TRANSACTIONS);

  const { data: categoryData, refetch: refetchCategory } = useQuery<{
    listCategory: CategoryProps[];
  }>(LIST_CATEGORIES);

  useEffect(() => {
    setTransactions(transactionData?.listTransaction || [])
    setCategories(categoryData?.listCategory || [])
  }, [transactionData, categoryData])

  return (
    <AuthContext.Provider
      value={{
        transactions,
        categories,
        refetchCategory,
        refetchTransaction,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
