"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { Button as BaseButton } from "@ecell/ui/components/button";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
}

// Maps the app's legacy API onto the shared shadcn primitives.
const variantMap: Record<ButtonVariant, { variant: "default" | "secondary" | "outline" | "ghost" | "destructive"; className?: string }> = {
  primary: { variant: "default" },
  secondary: { variant: "secondary" },
  outline: {
    variant: "outline",
    className:
      "hover:border-accent-lime hover:text-accent-lime hover:bg-transparent hover:shadow-[var(--shadow-glow-lime)] rounded-[var(--radius-lg)]",
  },
  ghost: {
    variant: "ghost",
    className: "rounded-[var(--radius-lg)] text-text-secondary hover:text-text-primary",
  },
  danger: {
    variant: "destructive",
    className: "rounded-[var(--radius-lg)] bg-error/10 text-error border border-error/20 hover:bg-error/20",
  },
};

const sizeClassMap: Record<ButtonSize, string> = {
  sm: "h-auto rounded-[var(--radius-lg)] px-4 py-2 text-sm gap-1.5",
  md: "h-auto rounded-[var(--radius-xl)] px-6 py-2.5 text-base gap-2",
  lg: "h-auto rounded-full px-10 py-3.5 text-lg gap-2.5",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      disabled,
      icon,
      iconRight,
      children,
      ...props
    },
    ref
  ) => {
    const { variant: baseVariant, className: variantOverride } = variantMap[variant];
    return (
      <BaseButton
        ref={ref}
        variant={baseVariant}
        size="default"
        disabled={disabled || loading}
        className={cn(
          "font-[family-name:var(--font-cta)] font-semibold transition-all duration-300 ease-out cursor-pointer active:scale-[0.98]",
          sizeClassMap[size],
          variantOverride,
          className
        )}
        {...props}
      >
        {loading ? (
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        ) : (
          icon
        )}
        {children}
        {iconRight}
      </BaseButton>
    );
  }
);
Button.displayName = "Button";

export { Button };
