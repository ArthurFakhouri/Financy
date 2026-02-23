import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export type ButtonIconProps = ComponentProps<"button">

export function ButtonIcon({ type = 'button', className, ...props }: ButtonIconProps) {
  return (
    <button
      type={type}
      className={cn(
        "flex items-center justify-center",
        "size-8 rounded-[8px] border border-gray-300",
        "hover:cursor-pointer hover:bg-gray-200",
        "disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}
