import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export type ButtonLabelProps = ComponentProps<"button"> & {
  variant?: "solid" | "outline"
  size?: "md" | "sm"
};

export function ButtonLabel({ type = 'button', className, variant = "solid", size = "md", ...props }: ButtonLabelProps) {
  return (
    <button
      type={type}
      data-size={size}
      data-variant={variant}
      className={cn(
        "flex justify-center items-center gap-2 rounded-[8px] font-medium",
        "data-[variant='solid']:bg-brand-base data-[variant='solid']:text-white",
        "data-[variant='solid']:[&>svg]:text-gray-100",
        "data-[variant='outline']:bg-white data-[variant='outline']:text-gray-700",
        "data-[variant='outline']:border data-[variant='outline']:border-gray-300",
        "hover:cursor-pointer transition-colors",
        "data-[variant='solid']:hover:bg-brand-dark",
        "data-[variant='outline']:hover:bg-gray-200",
        "data-[size='md']:h-12 data-[size='sm']:h-9",
        "data-[size='md']:px-4 data-[size='md']:py-3",
        "data-[size='sm']:px-3 data-[size='sm']:py-2",
        "data-[size='sm']:text-sm",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    />
  );
}
