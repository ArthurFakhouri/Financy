import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

export type AlertProps = {
  trigger: ReactNode;
  children?: ReactNode;
  className?: string;
  open?: boolean
  onOpenChange?: (open: boolean) => void
};

export function Alert({ open, trigger, children, className, onOpenChange }: AlertProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent
        className={cn("max-w-[300px]! md:max-w-[448px]! border border-gray-200 flex flex-col items-center justify-center", className)}
      >
        {children}
      </AlertDialogContent>
    </AlertDialog>
  );
}
