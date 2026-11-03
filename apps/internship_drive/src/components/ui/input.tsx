import {
  forwardRef,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";
import { Input as BaseInput } from "@ecell/ui/components/input";
import { Textarea as BaseTextarea } from "@ecell/ui/components/textarea";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
}

// Legacy API (label/error/hint/icon) mapped onto the shared shadcn Input.
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, icon, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-text-secondary font-[family-name:var(--font-ui)]"
          >
            {label}
            {props.required && <span className="text-error ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
              {icon}
            </div>
          )}
          <BaseInput
            ref={ref}
            id={inputId}
            aria-invalid={Boolean(error) || undefined}
            className={cn(
              "w-full h-auto bg-bg-card border border-border-default rounded-[var(--radius-lg)] px-4 py-2.5",
              "text-text-primary placeholder:text-text-muted font-[family-name:var(--font-body)] text-sm",
              "transition-all duration-200",
              "focus-visible:border-accent-lime focus-visible:ring-1 focus-visible:ring-accent-lime/30",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              icon && "pl-10",
              error && "border-error focus-visible:border-error focus-visible:ring-error/30",
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="text-xs text-error font-[family-name:var(--font-ui)]">{error}</p>
        )}
        {hint && !error && (
          <p className="text-xs text-text-muted font-[family-name:var(--font-ui)]">{hint}</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

// Textarea variant
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-text-secondary font-[family-name:var(--font-ui)]"
          >
            {label}
            {props.required && <span className="text-error ml-1">*</span>}
          </label>
        )}
        <BaseTextarea
          ref={ref}
          id={inputId}
          aria-invalid={Boolean(error) || undefined}
          className={cn(
            "min-h-[100px] resize-y bg-bg-card border border-border-default rounded-[var(--radius-lg)] px-4 py-2.5",
            "text-text-primary placeholder:text-text-muted font-[family-name:var(--font-body)] text-sm",
            "transition-all duration-200",
            "focus-visible:border-accent-lime focus-visible:ring-1 focus-visible:ring-accent-lime/30",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            error && "border-error focus-visible:border-error focus-visible:ring-error/30",
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-xs text-error font-[family-name:var(--font-ui)]">{error}</p>
        )}
        {hint && !error && (
          <p className="text-xs text-text-muted font-[family-name:var(--font-ui)]">{hint}</p>
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Input, Textarea };
