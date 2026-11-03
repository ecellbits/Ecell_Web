"use client";

import type { ReactNode } from "react";
import {
  Dialog as BaseDialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@ecell/ui/components/dialog";
import { cn } from "@/lib/utils";

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeStyles: Record<"sm" | "md" | "lg", string> = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
};

// Legacy API (open/onClose/size) mapped onto the shared shadcn Dialog.
export function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  className,
  size = "md",
}: DialogProps) {
  return (
    <BaseDialog
      open={open}
      onOpenChange={(nextOpen: boolean) => {
        if (!nextOpen) onClose();
      }}
    >
      <DialogContent
        className={cn(
          "bg-bg-card text-text-primary border-border-default rounded-[var(--radius-2xl)] p-6 font-[family-name:var(--font-body)]",
          sizeStyles[size],
          className
        )}
      >
        {(title || description) && (
          <DialogHeader className="mb-5 text-left">
            {title ? (
              <DialogTitle className="text-xl font-bold font-[family-name:var(--font-heading)] text-text-primary">
                {title}
              </DialogTitle>
            ) : (
              <DialogTitle className="sr-only">Dialog</DialogTitle>
            )}
            {description && (
              <DialogDescription className="text-sm text-text-secondary">
                {description}
              </DialogDescription>
            )}
          </DialogHeader>
        )}
        {!title && !description && (
          <DialogTitle className="sr-only">Dialog</DialogTitle>
        )}
        {children}
      </DialogContent>
    </BaseDialog>
  );
}
