import { X } from "lucide-react";
import { type CSSProperties, type ReactNode, useState } from "react";
import { Controller } from "react-hook-form";
import { ButtonIcon } from "@/components/Button/Icon";
import { ButtonLabel } from "@/components/Button/Label";
import { CategoryIcons } from "@/components/CategoryIcons";
import { InputLabel } from "@/components/InputLabel";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { categoryColors } from "@/constants/categoryColors";
import { categoryIcons } from "@/constants/categoryIcons";
import { cn } from "@/lib/utils";
import type { CategoryProps } from "@/types/category";
import { useDialogSaveCategory } from "./hook";

export type DialogSaveCategoryProps = {
  children: ReactNode;
  category?: CategoryProps;
  className?: string;
};

export function DialogSaveCategory(props: DialogSaveCategoryProps) {
  const { children, className } = props;

  const {
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
  } = useDialogSaveCategory(props);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className={cn("max-w-[448px]! w-full p-6", className)}
      >
        <div className="flex justify-between gap-4">
          <div className="flex flex-col gap-0.5">
            <DialogTitle className="font-semibold text-gray-800">
              {title}
            </DialogTitle>
            <DialogDescription className="text-sm leading-[20px] text-gray-600">
              {description}
            </DialogDescription>
          </div>
          <DialogClose asChild>
            <ButtonIcon>
              <X className="size-4" />
            </ButtonIcon>
          </DialogClose>
        </div>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <InputLabel
              label="Título"
              placeholder="Ex. Alimentação"
              {...register("title")}
              error={errors.title?.message}
            />
            <InputLabel
              label="Descrição"
              placeholder="Descrição da categoria"
              helper="Opcional"
              {...register("description")}
              error={errors.description?.message}
            />
            <div className="flex flex-col gap-2">
              <span className="font-medium text-sm leading-[20px] text-gray-700">
                Ícone
              </span>
              <Controller
                name="icon"
                control={control}
                render={({ field }) => {
                  return (
                    <div className="flex flex-wrap gap-2">
                      {categoryIcons.map((categoryIcon) => {
                        return (
                          <ButtonIcon
                            key={categoryIcon}
                            className="size-[42px]"
                            value={categoryIcon}
                            style={{
                              borderColor:
                                field.value === categoryIcon
                                  ? "var(--color-brand-base)"
                                  : "var(--color-gray-300)",
                            }}
                            onClick={() => field.onChange(categoryIcon)}
                          >
                            <CategoryIcons
                              icon={categoryIcon}
                              className="size-5 transition-colors"
                              style={{
                                color:
                                  field.value === categoryIcon
                                    ? "var(--color-gray-600)"
                                    : "var(--color-gray-500)",
                              }}
                            />
                          </ButtonIcon>
                        );
                      })}
                    </div>
                  );
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-medium text-sm leading-[20px] text-gray-700">
                Cor
              </span>
              <Controller
                name="color"
                control={control}
                render={({ field }) => {
                  return (
                    <div className="flex gap-2">
                      {categoryColors.map((categoryColor) => {
                        return (
                          <button
                            type="button"
                            key={categoryColor}
                            value={categoryColor}
                            className="flex-1 p-1 rounded-[8px] border hover:cursor-pointer"
                            style={{
                              borderColor:
                                field.value === categoryColor
                                  ? "var(--color-brand-base)"
                                  : "var(--color-gray-300)",
                            }}
                            onClick={() => field.onChange(categoryColor)}
                          >
                            <div
                              className="w-full h-5 rounded-[4px] transition-colors hover:bg-[var(--hover-background-color)]!"
                              style={
                                {
                                  backgroundColor: `var(--color-${categoryColor}-base)`,
                                  "--hover-background-color": `var(--color-${categoryColor}-dark)`,
                                } as CSSProperties
                              }
                            />
                          </button>
                        );
                      })}
                    </div>
                  );
                }}
              />
            </div>
          </div>
          <ButtonLabel
            type="submit"
            data-update={isUpdate}
            className={cn(
              "w-full",
              "data-[update='true']:bg-yellow-base!",
              "data-[update='true']:hover:bg-yellow-dark!",
            )}
            disabled={isLoading}
          >
            Salvar
          </ButtonLabel>
        </form>
      </DialogContent>
    </Dialog>
  );
}
