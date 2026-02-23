import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export type DatePickerSimpleProps = {
  className?: string
  error?: string
  date?: Date
  onDateChange: (date?: Date) => void
}

export function DatePickerSimple({
  date,
  error,
  className,
  onDateChange,
}: DatePickerSimpleProps) {
  return (
    <div className="flex flex-col gap-2">
      <Field className={cn(
        "flex min-w-[250px] flex-1 flex-col gap-2 group",
        className
      )}>
        <FieldLabel htmlFor="date-picker-simple">
          <span className={cn(
            "font-medium text-sm leading-[20px] text-gray-700",
            "group-[&:has(button:not(:disabled)[data-state='open'])]:text-brand-base",
          )}>Data</span>
        </FieldLabel>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date-picker-simple"
              className="px-3 py-3.5 h-auto text-base leading-[18px] justify-start hover:cursor-pointer"
            >
              {date ? (
                format(date, "dd/MM/yyyy", { locale: ptBR })
              ) : (
                <span className="text-base leading-[18px] text-gray-400">Selecione</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={onDateChange}
              defaultMonth={date}
            />
          </PopoverContent>
        </Popover>
      </Field>
      {error && <span className="text-xs text-danger">{error}</span>}
    </div>
  );
}
