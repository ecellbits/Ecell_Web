import { Badge as BaseBadge } from "@ecell/ui/components/badge";
import { cn } from "@/lib/utils";
import type { ApplicationStatus, ApprovalStatus, ListingStatus } from "@/types/database";

export type BadgeVariant = "default" | "lime" | "purple" | "success" | "warning" | "error" | "info";

type BaseVariant = "default" | "secondary" | "destructive" | "outline";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}

// Legacy API preserved on top of the shared shadcn Badge.
const variantStyles: Record<BadgeVariant, { variant: BaseVariant; className: string }> = {
  default: { variant: "outline", className: "bg-white/10 text-text-secondary border-border-default" },
  lime: { variant: "outline", className: "bg-accent-lime/10 text-accent-lime border-accent-lime/20" },
  purple: { variant: "outline", className: "bg-accent-purple/10 text-accent-purple border-accent-purple/20" },
  success: { variant: "outline", className: "bg-success-soft text-success border-success/20" },
  warning: { variant: "outline", className: "bg-warning-soft text-warning border-warning/20" },
  error: { variant: "outline", className: "bg-error-soft text-error border-error/20" },
  info: { variant: "outline", className: "bg-info-soft text-info border-info/20" },
};

export function Badge({ variant = "default", children, className, dot }: BadgeProps) {
  const { variant: baseVariant, className: variantClass } = variantStyles[variant];
  return (
    <BaseBadge
      variant={baseVariant}
      className={cn(
        "px-2.5 py-1 uppercase tracking-wider font-[family-name:var(--font-ui)]",
        variantClass,
        className
      )}
    >
      {dot && (
        <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
      )}
      {children}
    </BaseBadge>
  );
}

// Status-specific badge helpers
const applicationStatusMap: Record<ApplicationStatus, { variant: BadgeVariant; label: string }> = {
  applied: { variant: "info", label: "Applied" },
  shortlisted: { variant: "purple", label: "Shortlisted" },
  interview_scheduled: { variant: "warning", label: "Interview" },
  selected: { variant: "success", label: "Selected" },
  rejected: { variant: "error", label: "Rejected" },
  withdrawn: { variant: "default", label: "Withdrawn" },
};
export function ApplicationStatusBadge({ status }: { status: ApplicationStatus }) {
  const { variant, label } = applicationStatusMap[status];
  return <Badge variant={variant} dot>{label}</Badge>;
}
const listingStatusMap: Record<ListingStatus, { variant: BadgeVariant; label: string }> = {
  draft: { variant: "default", label: "Draft" },
  pending_approval: { variant: "warning", label: "Pending" },
  approved: { variant: "success", label: "Live" },
  rejected: { variant: "error", label: "Rejected" },
  closed: { variant: "default", label: "Closed" },
};
export function ListingStatusBadge({ status }: { status: ListingStatus }) {
  const { variant, label } = listingStatusMap[status];
  return <Badge variant={variant} dot>{label}</Badge>;
}
const approvalStatusMap: Record<ApprovalStatus, { variant: BadgeVariant; label: string }> = {
  pending: { variant: "warning", label: "Pending" },
  approved: { variant: "success", label: "Approved" },
  rejected: { variant: "error", label: "Rejected" },
};
export function ApprovalStatusBadge({ status }: { status: ApprovalStatus }) {
  const { variant, label } = approvalStatusMap[status];
  return <Badge variant={variant} dot>{label}</Badge>;
}
