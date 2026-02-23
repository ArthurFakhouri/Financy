import * as SelectRadix from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import { type MouseEvent, type ReactNode, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type SelectItemProps = {
  value: string | number;
  label: string | ReactNode;
};

export type SelectLabelProps = SelectRadix.SelectProps & {
  items: SelectItemProps[];
  label?: string;
  valueClassName?: string;
  valuePlaceholder?: string
  labelClassName?: string;
  triggerProps?: SelectRadix.SelectTriggerProps;
  contentClassName?: string
  htmlFor?: string;
  preValue?: ReactNode;
  error?: string
  helper?: string
};

export function SelectLabel({
  items,
  label,
  error,
  helper,
  htmlFor,
  preValue,
  triggerProps,
  valueClassName,
  labelClassName,
  valuePlaceholder,
  contentClassName,
  ...props
}: SelectLabelProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState("");

  function handleChangeItem(e: MouseEvent<HTMLButtonElement>) {
    if (e.target instanceof HTMLButtonElement) {
      if (props.value !== null) {
        setSelectedValue(e.target.value);
      }

      setIsOpen(false);

      if (props.onValueChange) {
        props.onValueChange(e.target.value);
      }
    }
  }

  function handleOpenChange(open: boolean) {
    setIsOpen(open)

    if (props.onOpenChange) {
      props.onOpenChange(open)
    }
  }

  useEffect(() => {
    if (props.open) {
      setIsOpen(props.open)
    }
  }, [props.open])

  useEffect(() => {
    if (props.value) {
      setSelectedValue(props.value)
    } else {
      setSelectedValue("")
    }
  }, [props.value])

  return (
    <div className="min-w-[250px] flex flex-1 flex-col gap-2 group">
      {label && (
        <label
          htmlFor={htmlFor}
          className={cn(
            "text-gray-700 font-medium text-sm transition-colors",
            "group-[&:has(button:not(:disabled)[data-state='open'])]:text-brand-base",
            labelClassName,
          )}
        >
          {label}
        </label>
      )}
      <SelectRadix.Root
        open={isOpen}
        onOpenChange={handleOpenChange}
        value={props.value || selectedValue}
        onValueChange={() => { }}
      >
        <SelectRadix.Trigger
          asChild
        >
          <button
            {...triggerProps}
            className={cn(
              'flex items-center w-full group',
              "w-full border border-gray-300 rounded-[8px]",
              "transition-colors px-3 py-3.5 outline-0",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "hover:cursor-pointer",
              triggerProps?.className,
            )}
          >
            {preValue}
            <span
              className={cn(
                "line-clamp-1 text-left capitalize flex-1 leading-[18px] h-4.5 text-gray-800",
                valueClassName,
              )}
            >
              {selectedValue && (
                items.find(({ value }) => `${value}` === selectedValue)?.label
              )}
              {!selectedValue && (
                <span className="leading-[18px] text-gray-400">{valuePlaceholder}</span>
              )}
            </span>
            <SelectRadix.Icon>
              <ChevronDown className="size-4 transition-transform group-data-[state='open']:rotate-180" />
            </SelectRadix.Icon>
          </button>
        </SelectRadix.Trigger>
        <SelectRadix.Portal>
          <SelectRadix.Content
            className={cn(
              "flex flex-col border bg-white border-gray-300 rounded-[8px] px-3 py-3.5",
              "shadow-[0px_4px_15px_0px_#0000001A]",
              "w-[var(--radix-select-trigger-width)]",
              contentClassName,
            )}
            position="popper"
            sideOffset={8}
          >
            <SelectRadix.Group className={"flex flex-col gap-4"}>
              {items?.map((item, index) => (
                <button
                  type="button"
                  data-active={selectedValue === `${item.value}`}
                  key={item.value + index.toString()}
                  className={cn(
                    "flex items-center transition-colors text-gray-800 leading-[18px] hover:cursor-pointer hover:text-brand-base",
                    "data-[active='true']:font-medium"
                  )}
                  value={`${item.value}`}
                  onClick={handleChangeItem}
                >
                  <span className="pointer-events-none capitalize flex-1 text-left">
                    {item.label}
                  </span>
                  {selectedValue === `${item.value}` && (
                    <Check className="size-5 text-success" />
                  )}
                </button>
              ))}
            </SelectRadix.Group>
          </SelectRadix.Content>
        </SelectRadix.Portal>
      </SelectRadix.Root>
      {error && <span className="text-xs text-danger">{error}</span>}
      {!error && helper && <span className="text-xs text-gray-500">{helper}</span>}
    </div>
  );
}
