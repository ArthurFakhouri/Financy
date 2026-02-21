import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export type ButtonIconProps = ComponentProps<"button"> & {
  size: "md" | "sm";
};

export function ButtonIcon({ className, size = "md", ...props }: ButtonIconProps) {
  return (
    <button
      data-size={size}
      className={cn(
        "flex justify-center items-center gap-2 rounded-[8px]",
        "bg-brand-base text-white [&>svg]:text-gray-100",
        "data-[size='md']:h-12 data-[size='sm']:h-9",
        "data-[size='md']:px-4 data-[size='md']:py-3",
        "data-[size='sm']:px-3 data-[size='sm']:py-2",
        "disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}
