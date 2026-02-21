import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type CardProps = ComponentProps<"div">;

export function Card({ className, ...props }: CardProps) {
  return <div className={cn(
    'p-8 rounded-[12px] bg-white border border-gray-200',
    className,
  )} {...props}></div>;
}
