import { CircleArrowDown, CircleArrowUp, X } from "lucide-react";
import { type ReactNode, useState } from "react";
import { Controller } from "react-hook-form";
import { ButtonIcon } from "@/components/Button/Icon";
import { ButtonLabel } from "@/components/Button/Label";
import { DatePickerSimple } from "@/components/DatePicker";
import { InputLabel } from "@/components/InputLabel";
import { SelectLabel } from "@/components/SelectLabel";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { TransactionProps } from "@/types/transaction";
import { useDialogSaveTransaction } from "./hook";

export type DialogSaveCategoryProps = {
  children: ReactNode;
  transaction?: TransactionProps;
  className?: string;
};

export function DialogSaveTransaction(props: DialogSaveCategoryProps) {
  const { children, className } = props;

  const {
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
  } = useDialogSaveTransaction(props);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className={cn("max-w-[448px]! w-full p-6", className)}
      >
        <div className="flex justify-between gap-4">
          <div className="flex flex-col gap-0.5">
            <DialogTitle className="font-semibold text-gray-800">{title}</DialogTitle>
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
            <Controller
              name="type"
              control={control}
              render={({ field }) => {
                return (
                  <div className="w-full flex items-center p-2 rounded-[12px] border border-gray-200">
                    <button
                      type="button"
                      data-selected={field.value === "expense"}
                      value={"expense"}
                      className={cn(
                        "flex-1 flex justify-center items-center gap-3 px-3 py-3.5 rounded-[8px]",
                        "text-gray-600 leading-[18px]",
                        "transition-colors group hover:cursor-pointer",
                        "not-data-selected:not-disabled:hover:bg-gray-200",
                        "data-[selected='true']:font-medium data-[selected='true']:text-gray-800",
                        "data-[selected='true']:border data-[selected='true']:border-red-base",
                      )}
                      onClick={() => field.onChange("expense")}
                    >
                      <CircleArrowDown className="size-4 group-data-[selected='true']:text-red-base" />
                      Despesa
                    </button>
                    <button
                      type="button"
                      value={"revenue"}
                      data-selected={field.value === "revenue"}
                      className={cn(
                        "flex-1 flex justify-center items-center gap-3 px-3 py-3.5 rounded-[8px]",
                        "text-gray-600 leading-[18px]",
                        "transition-colors group hover:cursor-pointer",
                        "not-data-selected:not-disabled:hover:bg-gray-200",
                        "data-[selected='true']:font-medium data-[selected='true']:text-gray-800",
                        "data-[selected='true']:border data-[selected='true']:border-green-base",
                      )}
                      onClick={() => field.onChange("revenue")}
                    >
                      <CircleArrowUp className="size-4 group-data-[selected='true']:text-green-base" />
                      Receita
                    </button>
                  </div>
                );
              }}
            />
            <InputLabel
              label="Descrição"
              placeholder="Ex. Almoço no restaurante"
              {...register("description")}
              error={errors.description?.message}
            />
            <div className="flex items-start gap-4">
              <Controller
                name="date"
                control={control}
                render={({ field }) => {
                  return (
                    <DatePickerSimple
                      className="min-w-[150px]"
                      date={field.value}
                      onDateChange={field.onChange}
                      error={errors.date?.message}
                    />
                  );
                }}
              />
              <Controller
                name="value"
                control={control}
                render={({ field }) => {
                  return (
                    <InputLabel
                      label="Valor"
                      placeholder="Valor"
                      value={formatValue(field.value)}
                      rootClassName="min-w-[150px]"
                      error={errors.value?.message}
                      onChange={(e) =>
                        field.onChange(handleChangeValue(e.target.value))
                      }
                    />
                  );
                }}
              />
            </div>
            <Controller
              name="category"
              control={control}
              render={({ field }) => {
                return (
                  <SelectLabel
                    label="Categoria"
                    items={categoryFilters}
                    valuePlaceholder="Selecione"
                    value={field.value}
                    onValueChange={field.onChange}
                    error={errors.category?.message}
                    contentClassName="z-51"
                  />
                );
              }}
            />
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
