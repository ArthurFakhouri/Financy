import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export type DividerProps = ComponentProps<"div"> & {
  textClassName?: string
};

export function Divider({
  children,
  className,
  textClassName,
  ...props
}: DividerProps) {
  return (
    <div className={cn(
      "flex items-center text-center",
      className
    )} {...props}>
      <div className="flex-1 border-b border-gray-300" />
      <span className={cn(
        "px-3 text-gray-500 text-sm leading-[20px]",
        textClassName,
      )}>{children}</span>
      <div className="flex-1 border-b border-gray-300" />
    </div >
  )
}
