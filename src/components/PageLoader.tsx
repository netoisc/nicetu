import { Loader2 } from "lucide-react";

/**
 * Full-page loading state with accessible announcement.
 * Use when checking auth or redirecting so users never see a blank screen.
 */
export function PageLoader() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-4"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <Loader2 className="w-8 h-8 text-primary animate-spin" aria-hidden />
      <span className="sr-only">Loading</span>
    </div>
  );
}
