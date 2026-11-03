import { forwardRef, type SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, hint, options, placeholder, id, ...props }, ref) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-medium text-text-secondary font-[family-name:var(--font-ui)]"
          >
            {label}
            {props.required && <span className="text-error ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={cn(
              "w-full bg-bg-card border border-border-default rounded-[var(--radius-lg)] px-4 py-2.5 pr-10",
              "text-text-primary font-[family-name:var(--font-body)] text-sm",
              "transition-all duration-200 appearance-none",
              "focus:outline-none focus:border-accent-lime focus:ring-1 focus:ring-accent-lime/30",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              error && "border-error focus:border-error focus:ring-error/30",
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-bg-card">
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
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

Select.displayName = "Select";
export { Select };
