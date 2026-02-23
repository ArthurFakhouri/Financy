import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { SelectItemProps } from "@/components/SelectLabel";
import { AuthContext } from "@/context/auth";
import { apolloClient } from "@/lib/graphql/apollo";
import {
  CREATE_TRANSACTION,
  UPDATE_TRANSACTION,
} from "@/lib/graphql/mutations/transaction";
import type { TransactionProps } from "@/types/transaction";
import type { DialogSaveCategoryProps } from ".";
import { type SaveTransactionProps, saveTransactionSchema } from "./validation";

type CreateTransactionMutationData = {
  createTransaction: TransactionProps;
};

type UpdateTransactionMutationData = {
  updateTransaction: TransactionProps;
};

export function useDialogSaveTransaction(props: DialogSaveCategoryProps) {
  const { transaction } = props;

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { categories, refetchCategory, refetchTransaction } =
    useContext(AuthContext);

  const transactionForm = useForm<SaveTransactionProps>({
    resolver: zodResolver(saveTransactionSchema),
    defaultValues: {
      type: "expense",
      value: "0",
      category: "",
    },
  });

  const {
    control,
    reset,
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = transactionForm;

  const { title, description, isUpdate } = useMemo(() => {
    if (transaction) {
      return {
        title: "Editar transação",
        description: "Edite os dados da transação",
        isUpdate: true,
      };
    } else {
      return {
        title: "Nova transação",
        description: "Registre sua despesa ou receita",
        isUpdate: false,
      };
    }
  }, [transaction]);

  function formatValue(value: string) {
    const valueNumber = Number(value) / 100;

    return valueNumber.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function handleChangeValue(newValue: string) {
    const onlyDigits = newValue.replace(/\D/g, "");

    return onlyDigits;
  }

  async function createTransaction(data: SaveTransactionProps) {
    try {
      const { data: categoryData } = await apolloClient.mutate<
        CreateTransactionMutationData,
        {
          data: Omit<
            TransactionProps,
            "id" | "created_at" | "updated_at" | "category"
          >;
        }
      >({
        mutation: CREATE_TRANSACTION,
        variables: {
          data: {
            type: data.type,
            date: data.date.toISOString(),
            value: Number(
              data.value
                .replace(/\s/g, "")
                .replace("R$", "")
                .replace("/\./g", "")
                .replace(",", "."),
            ),
            category_id: data.category,
            description: data.description || "",
          },
        },
      });
      if (categoryData?.createTransaction) {
        toast.success("Categoria cadastrada com sucesso!");
        refetchTransaction();
        refetchCategory();
        setOpen(false);
      }
    } catch (err) {
      toast.error("Não foi possível cadastrar a transação", {
        description: `${err}`,
      });
    }
  }

  async function updateTransaction(id: string, data: SaveTransactionProps) {
    try {
      const { data: categoryData } = await apolloClient.mutate<
        UpdateTransactionMutationData,
        {
          data: Omit<
            TransactionProps,
            "id" | "created_at" | "updated_at" | "category"
          >;
          id: string;
        }
      >({
        mutation: UPDATE_TRANSACTION,
        variables: {
          data: {
            type: data.type,
            date: data.date.toISOString(),
            value: Number(
              data.value
                .replace(/\s/g, "")
                .replace("R$", "")
                .replace("/\./g", "")
                .replace(",", "."),
            ),
            category_id: data.category,
            description: data.description || "",
          },
          id: id,
        },
      });
      if (categoryData?.updateTransaction) {
        toast.success("Transação atualizada com sucesso!");
        refetchTransaction();
        refetchCategory();
        setOpen(false);
      }
    } catch (err) {
      toast.error("Não foi possível atualizar a transação", {
        description: `${err}`,
      });
    }
  }

  async function onSubmit(data: SaveTransactionProps) {
    setIsLoading(true);
    if (transaction) {
      await updateTransaction(transaction.id, data);
    } else {
      await createTransaction(data);
    }
    setIsLoading(false);
    reset();
  }

  const categoryFilters = useMemo(() => {
    return categories.map((category) => {
      return {
        label: category.title,
        value: category.id,
      } as SelectItemProps;
    });
  }, [categories]);

  useEffect(() => {
    if (transaction) {
      setValue('type', transaction.type)
      setValue('description', transaction.description)
      setValue('date', new Date(transaction.date))
      setValue('value', transaction.value.toFixed(2))
      setValue('category', transaction.category.id)
    }
  }, [transaction, setValue])

  return {
    open,
    title,
    errors,
    control,
    isUpdate,
    isLoading,
    description,
    categoryFilters,
    setOpen,
    register,
    onSubmit,
    formatValue,
    handleSubmit,
    handleChangeValue,
  };
}
