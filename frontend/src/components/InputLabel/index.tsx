import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type InputLabelProps = ComponentProps<"input"> & {
  rootClassName?: string
  boxClassName?: string
  labelClassName?: string;
  label?: string;
  htmlFor?: string;
  preInput?: ReactNode;
  posInput?: ReactNode;
  error?: string
  helper?: string
};

export function InputLabel({
  label,
  error,
  helper,
  htmlFor,
  posInput,
  preInput,
  className,
  boxClassName,
  rootClassName,
  labelClassName,
  ...inputProps
}: InputLabelProps) {
  return (
    <div className={cn(
      "flex min-w-[250px] flex-1 flex-col gap-2 group",
      rootClassName,
    )}>
      {label && (
        <label
          data-error={Boolean(error)}
          htmlFor={htmlFor}
          className={cn(
            "text-gray-700 font-medium text-sm transition-colors",
            "data-[error='false']:group-[&:has(input:not(:disabled):focus)]:text-brand-base",
            "data-[error='true']:text-danger",
            labelClassName
          )}
        >
          {label}
        </label>
      )}
      <div data-error={Boolean(error)} className={
        cn(
          "flex items-center px-3 py-3.5 border border-gray-300 rounded-[8px] gap-3 transition-colors text-gray-400",
          "data-[error='false']:group-[&:has(input:not(:disabled):focus)]:[&>svg]:text-brand-base",
          "group-[&:has(input:not(:disabled))]:data-[error='true']:[&>svg]:text-danger",
          "[&:has(input:not(:placeholder-shown))]:text-gray-800",
          boxClassName,
        )}>
        {preInput}
        <input
          className={cn(
            "h-4.5 leading-[18px] outline-0 w-full text-gray-800 placeholder-gray-400",
            "focus:caret-brand-base transition-colors",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            className,
          )}
          {...inputProps}
        />
        {posInput}
      </div>
      {error && <span className="text-xs text-danger">{error}</span>}
      {!error && helper && <span className="text-xs text-gray-500">{helper}</span>}
    </div>
  );
}
