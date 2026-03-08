import { Skeleton } from "@/components/ui/skeleton";

/** Single profile card skeleton (for public card page or dashboard). */
export function ProfileCardSkeleton() {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="rounded-2xl border border-border bg-card/60 overflow-hidden">
        <div className="h-24 rounded-t-2xl animate-skeleton-shimmer" />
        <div className="relative px-6 -mt-14">
          <Skeleton className="w-28 h-28 rounded-2xl mx-auto" />
        </div>
        <div className="p-6 pt-6 space-y-4">
          <div className="space-y-2 text-center">
            <Skeleton className="h-7 w-40 mx-auto rounded-md" />
            <Skeleton className="h-4 w-24 mx-auto rounded-md" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-3 w-full rounded-md" />
            <Skeleton className="h-3 w-full rounded-md" />
            <Skeleton className="h-3 w-3/4 mx-auto rounded-md" />
          </div>
          <div className="h-px bg-border my-3" />
          <div className="space-y-3">
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-2/3 rounded-md" />
          </div>
        </div>
        <div className="h-1 bg-muted rounded-b-2xl" />
      </div>
    </div>
  );
}

/**
 * Skeleton for the dashboard: ProfileCard + QRCodeDisplay layout.
 */
export function ProfileScreenSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 w-full max-w-4xl mx-auto">
      <ProfileCardSkeleton />

      {/* QR card skeleton */}
      <div className="w-full max-w-xs mx-auto">
        <div className="rounded-2xl border border-border bg-card/60 p-6 space-y-4">
          <Skeleton className="h-4 w-32 mx-auto rounded-md" />
          <div className="w-[200px] h-[200px] mx-auto">
            <Skeleton className="w-full h-full rounded-xl" />
          </div>
          <Skeleton className="h-9 w-full rounded-md" />
        </div>
      </div>
    </div>
  );
}
