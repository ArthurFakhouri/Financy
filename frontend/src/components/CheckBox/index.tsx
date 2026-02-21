import * as CheckboxRadix from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export type CheckedProps = boolean | "indeterminate";

type CheckBoxProps = ComponentProps<typeof CheckboxRadix.Root> & {
  indicatorClassName?: string;
  textSide?: "left" | "right";
};

export function CheckBox({
  children,
  className,
  textSide = "right",
  indicatorClassName,
  ...props
}: CheckBoxProps) {
  return (
    // biome-ignore lint/a11y/noLabelWithoutControl: <explanation>
    <label className="flex items-center gap-2 text-gray-700 text-sm leading-[20px] active:select-none hover:cursor-pointer">
      {textSide === "left" && children && <>{children}</>}
      <CheckboxRadix.Root
        className={cn(
          "size-4 rounded-[4px] flex items-center justify-center bg-white border border-gray-300",
          "data-[state='checked']:bg-green-dark",
          "active:pointer-events-none",
          "hover:cursor-pointer hover:border-brand-dark",
          className,
        )}
        {...props}
      >
        <CheckboxRadix.Indicator className={cn('text-white', indicatorClassName)}>
          <CheckIcon className="size-3" />
        </CheckboxRadix.Indicator>
      </CheckboxRadix.Root>
      {textSide === "right" && children && <>{children}</>}
    </label>
  );
}
