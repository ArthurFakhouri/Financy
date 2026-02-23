import { useContext, useMemo, useState } from "react";
import { toast } from "sonner";
import { AuthContext } from "@/context/auth";
import { apolloClient } from "@/lib/graphql/apollo";
import { DELETE_CATEGORY } from "@/lib/graphql/mutations/category";
import type { CategoryProps } from "@/types/category";

export function useCategories() {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { categories, refetchCategory } = useContext(AuthContext);

  async function handleDeleteCategory(category: CategoryProps) {
    try {
      setIsLoading(true);
      const { data } = await apolloClient.mutate<boolean, { id: string }>({
        mutation: DELETE_CATEGORY,
        variables: {
          id: category.id,
        },
      });

      if (data) {
        toast.success(`Categoria ${category.title} deletada com sucesso!`);
        refetchCategory();
        setOpenDeleteModal(false);
      }
    } catch (err) {
      toast.error("Não foi possível deletar a categoria", {
        description: `${err}`,
      });
    } finally {
      setIsLoading(false);
    }
  }

  const { totalCategories, mostUsedCategory, totalTransactions } =
    useMemo(() => {
      const totalCategories = categories.length;
      const totalTransactions = categories.reduce(
        (acc, curr) => acc + curr.transactions.length,
        0,
      );
      let mostUsedCategory: CategoryProps | undefined;
      if (categories.length > 0) {
        const sortedCategoriesByTransactions = [...categories].sort(
          (a, b) => b.transactions.length - a.transactions.length,
        );
        mostUsedCategory = sortedCategoriesByTransactions[0]
      }

      return {
        totalCategories,
        mostUsedCategory,
        totalTransactions,
      };
    }, [categories]);

  return {
    isLoading,
    categories,
    openDeleteModal,
    totalCategories,
    mostUsedCategory,
    totalTransactions,
    setOpenDeleteModal,
    handleDeleteCategory,
  };
}
