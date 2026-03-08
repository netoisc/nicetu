import { cn } from "@/lib/utils";

type LogoVariant = "card" | "n";

interface NicetuLogoProps {
  /** Icon + wordmark by default. Set to false for icon only. */
  showWordmark?: boolean;
  /** "card" = intuitive card+link mark (default). "n" = geometric N. */
  variant?: LogoVariant;
  /** Slightly lighter stroke for card variant in tight layouts (e.g. badge). */
  compact?: boolean;
  className?: string;
}

const gradientDefs = (
  <defs>
    <linearGradient id="nicetu-logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="hsl(175 80% 50%)" />
      <stop offset="100%" stopColor="hsl(280 70% 60%)" />
    </linearGradient>
    <linearGradient id="nicetu-logo-grad-vertical" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="hsl(175 80% 50%)" />
      <stop offset="100%" stopColor="hsl(280 70% 60%)" />
    </linearGradient>
  </defs>
);

/** Card + link mark: reads as "digital card" / "one link" at a glance. */
function LogoMarkCard({ strokeWeight = 1.5 }: { strokeWeight?: number }) {
  return (
    <svg viewBox="0 0 40 40" className="shrink-0 w-full h-full text-primary" aria-hidden>
      {gradientDefs}
      {/* Card shape (rounded rect) – lighter stroke so it doesn’t overpower the wordmark */}
      <rect
        x="4"
        y="6"
        width="32"
        height="28"
        rx="5"
        fill="none"
        stroke="url(#nicetu-logo-grad)"
        strokeWidth={strokeWeight}
      />
      {/* Link node (single point = one contact, one link) */}
      <circle
        cx="20"
        cy="20"
        r="5"
        fill="url(#nicetu-logo-grad-vertical)"
        opacity="0.95"
      />
      <circle cx="20" cy="20" r="2.5" fill="hsl(180 100% 98%)" />
    </svg>
  );
}

/** Geometric N (legacy variant). */
function LogoMarkN() {
  return (
    <svg viewBox="0 0 40 40" className="shrink-0 w-full h-full text-primary" aria-hidden>
      {gradientDefs}
      <rect x="5" y="6" width="4" height="28" rx="1" fill="url(#nicetu-logo-grad)" />
      <path d="M9 6 L29 34 L33 34 L13 6 Z" fill="url(#nicetu-logo-grad)" fillOpacity="0.85" />
      <rect x="33" y="6" width="4" height="28" rx="1" fill="url(#nicetu-logo-grad)" />
      <circle cx="20" cy="18" r="3" fill="hsl(180 100% 95%)" opacity="0.9" />
    </svg>
  );
}

/**
 * Nicetu logo: intuitive card+link mark by default, optional N variant.
 * Uses theme primary (teal) and accent (purple).
 */
export function NicetuLogo({ showWordmark = true, variant = "card", compact = false, className }: NicetuLogoProps) {
  return (
    <div className={cn("inline-flex items-center gap-2.5 font-semibold tracking-tight size-8", className)}>
      {variant === "card" ? <LogoMarkCard strokeWeight={compact ? 1.25 : 1.5} /> : <LogoMarkN />}
      {showWordmark && (
        <span className={cn("text-foreground font-mono", compact ? "text-sm" : "text-lg")}>nicetu</span>
      )}
    </div>
  );
}
