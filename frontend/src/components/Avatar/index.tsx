import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export type AvatarProps = ComponentProps<"div"> & {
  size?: "md" | "sm";
};

export function Avatar({ size = "md", className, ...props }: AvatarProps) {
  return (
    <div
      data-size={size}
      className={cn(
        "data-[size='md']:size-16",
        "data-[size='sm']:size-9",
        "data-[size='md']:text-2xl data-[size='md']:leading-[40px]",
        "data-[size='sm']:size-9",
        "data-[size='sm']:text-sm data-[size='sm']:leading-[20px]",
        "rounded-full bg-gray-300 text-gray-800 flex items-center justify-center font-medium", className)}
      {...props}
    />
  );
}
