import { Skeleton as BaseSkeleton } from "@ecell/ui/components/skeleton";
import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <BaseSkeleton
      className={cn("rounded-[var(--radius-lg)] bg-white/5", className)}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-bg-card border border-border-default rounded-[var(--radius-2xl)] p-6 space-y-4">
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <div className="space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
      </div>
      <div className="flex gap-2 pt-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
    </div>
  );
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      <Skeleton className="h-10 w-full rounded-[var(--radius-lg)]" />
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-14 w-full rounded-[var(--radius-lg)]" />
      ))}
    </div>
  );
}

