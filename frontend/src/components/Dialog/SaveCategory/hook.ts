import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { categoryColors } from "@/constants/categoryColors";
import { categoryIcons } from "@/constants/categoryIcons";
import { AuthContext } from "@/context/auth";
import { apolloClient } from "@/lib/graphql/apollo";
import { CREATE_CATEGORY, UPDATE_CATEGORY } from "@/lib/graphql/mutations/category";
import type { CategoryProps } from "@/types/category";
import type { DialogSaveCategoryProps } from ".";
import { type SaveCategoryProps, saveCategorySchema } from "./validation";

type CreateCategoryMutationData = {
  createCategory: CategoryProps;
};

type UpdateCategoryMutationData = {
  updateCategory: CategoryProps;
};

export function useDialogSaveCategory(props: DialogSaveCategoryProps) {
  const { category } = props;
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  const { refetchCategory } = useContext(AuthContext);

  const categoryForm = useForm<SaveCategoryProps>({
    resolver: zodResolver(saveCategorySchema),
    defaultValues: {
      title: "",
      description: "",
      icon: categoryIcons[0],
      color: categoryColors[0],
    },
  });

  const {
    control,
    reset,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = categoryForm;

  const { title, description, isUpdate } = useMemo(() => {
    if (category) {
      return {
        title: "Editar categoria",
        description: "Edite os dados da categoria",
        isUpdate: true,
      };
    } else {
      return {
        title: "Nova categoria",
        description: "Organize suas transações com categorias",
        isUpdate: false,
      };
    }
  }, [category]);

  async function createCategory(data: SaveCategoryProps) {
    try {
      const { data: categoryData } = await apolloClient.mutate<
        CreateCategoryMutationData,
        { data: Omit<CategoryProps, "id" | "created_at" | "updated_at" | "transactions"> }
      >({
        mutation: CREATE_CATEGORY,
        variables: {
          data: {
            title: data.title,
            description: data.description || "",
            icon: data.icon,
            color: data.color,
          },
        },
      });
      if (categoryData?.createCategory) {
        toast.success("Categoria cadastrada com sucesso!");
        refetchCategory()
        setOpen(false)
      }
    } catch (err) {
      toast.error("Não foi possível cadastrar a categoria", {
        description: `${err}`,
      });
    }
  }

  async function updateCategory(id: string, data: SaveCategoryProps) {
    try {
      const { data: categoryData } = await apolloClient.mutate<
        UpdateCategoryMutationData,
        { data: Omit<CategoryProps, "id" | "created_at" | "updated_at" | "transactions">, id: string }
      >({
        mutation: UPDATE_CATEGORY,
        variables: {
          data: {
            title: data.title,
            description: data.description || "",
            icon: data.icon,
            color: data.color,
          },
          id: id,
        },
      });
      if (categoryData?.updateCategory) {
        toast.success("Categoria atualizada com sucesso!");
        refetchCategory()
        setOpen(false)
      }
    } catch (err) {
      toast.error("Não foi possível atualizar a categoria", {
        description: `${err}`,
      });
    }
  }

  async function onSubmit(data: SaveCategoryProps) {
    setIsLoading(true)
    if (category) {
      await updateCategory(category.id, data)
    } else {
      await createCategory(data)
    }
    setIsLoading(false)
    reset()
  }

  useEffect(() => {
    if (category) {
      setValue("title", category.title);
      setValue("description", category.description);
      setValue("icon", category.icon);
      setValue("color", category.color);
    }
  }, [category, setValue]);

  return {
    open,
    title,
    errors,
    control,
    isUpdate,
    isLoading,
    description,
    setOpen,
    onSubmit,
    register,
    handleSubmit,
  };
}
