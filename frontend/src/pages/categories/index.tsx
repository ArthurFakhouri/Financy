import {
  ArrowUpDown,
  Info,
  Plus,
  SquarePen,
  Tag,
  Trash,
  Utensils,
} from "lucide-react";
import { Alert } from "@/components/Alert";
import { ButtonIcon } from "@/components/Button/Icon";
import { ButtonLabel } from "@/components/Button/Label";
import { Card } from "@/components/Card";
import { CategoryIcons } from "@/components/CategoryIcons";
import { DialogSaveCategory } from "@/components/Dialog/SaveCategory";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useCategories } from "./hook";

export function Categories() {
  const {
    isLoading,
    categories,
    openDeleteModal,
    totalCategories,
    mostUsedCategory,
    totalTransactions,
    setOpenDeleteModal,
    handleDeleteCategory,
  } = useCategories();

  return (
    <div className="px-4 md:px-12 flex flex-col gap-4 md:gap-8">
      <div className="w-full flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col gap-0.5">
          <h1 className="font-bold text-2xl leading-[32px] text-gray-800">
            Categorias
          </h1>
          <p className="text-gray-600">
            Organize suas transações por categorias
          </p>
        </div>
        <DialogSaveCategory>
          <ButtonLabel size="sm">
            <Plus className="size-4" />
            Nova categoria
          </ButtonLabel>
        </DialogSaveCategory>
      </div>

      <div className="w-full flex flex-wrap items-center gap-4 md:gap-6">
        <Card className="flex-1 p-6 min-w-[250px] flex gap-4">
          <div className="size-8 flex items-center justify-center">
            <Tag className="size-6 text-gray-700" />
          </div>
          <div className="flex flex-col gap-2">
            <strong className="font-bold text-[28px] leading-[32px] text-gray-800">
              {totalCategories}
            </strong>
            <span className="text-xs leading-[16px] font-medium text-gray-500 uppercase tracking-[0.6px]">
              Total de categorias
            </span>
          </div>
        </Card>
        <Card className="flex-1 p-6 min-w-[250px] flex gap-4">
          <div className="size-8 flex items-center justify-center">
            <ArrowUpDown className="size-6 text-purple-base" />
          </div>
          <div className="flex flex-col gap-2">
            <strong className="font-bold text-[28px] leading-[32px] text-gray-800">
              {totalTransactions}
            </strong>
            <span className="text-xs leading-[16px] font-medium text-gray-500 uppercase tracking-[0.6px]">
              Total de transações
            </span>
          </div>
        </Card>
        <Card className="flex-1 p-6 min-w-[250px] flex items-start gap-4">
          {mostUsedCategory && (
            <div className="size-8 flex items-center justify-center">
              <Utensils className="size-6 text-blue-base" />
            </div>
          )}
          <div className="flex flex-col gap-2">
            <strong className="font-bold text-[28px] leading-[32px] text-gray-800">
              {mostUsedCategory?.title}
              {!mostUsedCategory && "-"}
            </strong>
            <span className="text-xs leading-[16px] font-medium text-gray-500 uppercase tracking-[0.6px]">
              Categoria mais utilizada
            </span>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((category) => {
          return (
            <Card key={category.id} className="p-6 flex flex-col gap-5">
              <div className="flex flex-wrap justify-between gap-4">
                <div className="size-10 flex items-center justify-center rounded-[8px]"
                  style={{
                    backgroundColor: `var(--color-${category.color}-light)`,
                  }}
                >
                  <CategoryIcons icon={category.icon} className="size-5" style={{
                    color: `var(--color-${category.color}-base)`,
                  }} />
                </div>
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
                        Tem certeza que deseja excluir a categoria{" "}
                        {category.title}?
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-sm leading-[20px] text-center text-gray-600">
                        Ao excluir a categoria, as transações ligadas a essa
                        categoria também serão removidas.
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
                          onClick={() => handleDeleteCategory(category)}
                          disabled={isLoading}
                        >
                          Excluir
                        </ButtonLabel>
                      </AlertDialogAction>
                    </div>
                  </Alert>
                  <DialogSaveCategory category={category}>
                    <ButtonIcon>
                      <SquarePen className="size-4 text-gray-700" />
                    </ButtonIcon>
                  </DialogSaveCategory>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <strong className="font-semibold text-gray-800">
                  {category.title}
                </strong>
                <p
                  title={category.description}
                  className="text-sm h-10 line-clamp-2 leading-[20px] text-gray-600"
                >
                  {category.description}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div
                  className="px-3 py-1 flex items-center justify-center rounded-full font-medium text-sm leading-[20px]"
                  style={{
                    backgroundColor: `var(--color-${category.color}-light)`,
                    color: `var(--color-${category.color}-base)`,
                  }}
                >
                  {category.title}
                </div>
                <span className="text-sm leading-[20px] text-gray-600">
                  {category.transactions.length} itens
                </span>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
