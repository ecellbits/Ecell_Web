import type { HTMLAttributes } from "react";
import { Card as BaseCard, CardHeader as BaseCardHeader, CardTitle as BaseCardTitle, CardDescription as BaseCardDescription, CardContent as BaseCardContent, CardFooter as BaseCardFooter } from "@ecell/ui/components/card";
import { cn } from "@/lib/utils";

export type CardVariant = "solid" | "glass" | "elevated" | "outlined";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  hover?: boolean;
  padding?: "sm" | "md" | "lg" | "none";
}

// Legacy API preserved on top of the shared shadcn Card.
const variantStyles: Record<CardVariant, string> = {
  solid: "bg-bg-card text-text-primary py-0 gap-0",
  glass: "bg-bg-glass backdrop-blur-xl border border-border-purple shadow-[var(--shadow-glow-purple)] text-text-primary py-0 gap-0",
  elevated: "bg-bg-elevated border border-border-default shadow-[var(--shadow-elevated)] text-text-primary py-0 gap-0",
  outlined: "bg-transparent border border-border-default text-text-primary py-0 gap-0",
};

const paddingStyles = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8 lg:p-10",
} as const;

export function Card({
  className,
  variant = "solid",
  hover = false,
  padding = "md",
  children,
  ...props
}: CardProps) {
  return (
    <BaseCard
      className={cn(
        "rounded-[var(--radius-2xl)] transition-all duration-500",
        variantStyles[variant],
        paddingStyles[padding],
        hover &&
          "hover:scale-[1.01] hover:border-border-hover hover:shadow-[var(--shadow-card)] cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </BaseCard>
  );
}

export function CardHeader({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <BaseCardHeader className={cn("mb-4 gap-2", className)} {...props}>
      {children}
    </BaseCardHeader>
  );
}

export function CardTitle({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <BaseCardTitle
      className={cn(
        "text-xl font-bold font-[family-name:var(--font-heading)] text-text-primary",
        className
      )}
      {...props}
    >
      {children}
    </BaseCardTitle>
  );
}

export function CardDescription({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <BaseCardDescription
      className={cn("text-sm text-text-secondary mt-1", className)}
      {...props}
    >
      {children}
    </BaseCardDescription>
  );
}

export function CardContent({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <BaseCardContent className={className} {...props}>
      {children}
    </BaseCardContent>
  );
}

export function CardFooter({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <BaseCardFooter className={className} {...props}>
      {children}
    </BaseCardFooter>
  );
}
