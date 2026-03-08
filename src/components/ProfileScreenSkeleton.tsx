import { Skeleton } from "@/components/ui/skeleton";

/** Single profile card skeleton — landscape (wide, short) like bank/business cards. */
export function ProfileCardSkeleton() {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="rounded-2xl border border-border bg-card/60 overflow-hidden aspect-[8/5] min-h-[180px]">
        <div className="h-10 rounded-t-2xl animate-skeleton-shimmer" />
        <div className="p-4 flex gap-4 -mt-6">
          <Skeleton className="w-20 h-20 shrink-0 rounded-xl" />
          <div className="flex-1 min-w-0 space-y-2 pt-1">
            <Skeleton className="h-6 w-32 rounded-md" />
            <Skeleton className="h-4 w-24 rounded-md" />
            <Skeleton className="h-3 w-full rounded-md" />
            <Skeleton className="h-3 w-4/5 rounded-md" />
            <div className="h-px bg-border my-2" />
            <div className="flex gap-2">
              <Skeleton className="h-4 w-20 rounded-md" />
              <Skeleton className="h-4 w-20 rounded-md" />
            </div>
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
