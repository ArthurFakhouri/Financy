import type { LinkProps } from "react-router-dom";
import { Link as LinkRouterDom } from "react-router-dom";
import { cn } from "@/lib/utils";

export function Link({ className, ...props }: LinkProps) {
  return (
    <LinkRouterDom
      className={cn(
        "text-brand-base font-medium text-sm leading-[20px]",
        "hover:text-brand-base",
        "hover:cursor-pointer",
        "hover:underline",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
