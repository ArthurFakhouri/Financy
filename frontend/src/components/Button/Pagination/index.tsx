import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type ButtonPaginationProps = ComponentProps<"button"> & {
  active?: boolean
};

export function ButtonPagination({
  type = "button",
  active = false,
  className,
  ...props
}: ButtonPaginationProps) {
  return (
    <button
      type={type}
      data-active={active}
      className={cn(
        "size-8 rounded-[8px]",
        "bg-white border border-gray-300",
        "flex items-center justify-center",
        "transition-colors",
        "text-gray-700 text-sm font-medium leading-[20px]",
        "not-disabled:hover:cursor-pointer not-disabled:hover:bg-gray-200 not-disabled:hover:text-gray-700",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-[active='true']:bg-brand-base data-[active='true']:text-white",
        className,
      )}
      {...props}
    />
  );
}
