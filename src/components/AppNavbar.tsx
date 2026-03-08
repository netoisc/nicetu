import { Link } from "react-router-dom";
import { NicetuLogo } from "./NicetuLogo";

interface AppNavbarProps {
  /** Left slot (e.g. Sign out). Use empty div if nothing. */
  left: React.ReactNode;
  /** Right slot (e.g. LanguageSwitcher). Use empty div if nothing. */
  right: React.ReactNode;
  /** Logo variant. Default: compact with wordmark. */
  logoCompact?: boolean;
  /** Hide wordmark (icon only). Default: false. */
  logoIconOnly?: boolean;
}

/**
 * Centered-logo navbar. Logo sits in a full-bleed overlay, centered in the viewport.
 * Left/right slots stay in flow for layout. Works consistently on Safari iOS.
 */
export function AppNavbar({ left, right, logoCompact = true, logoIconOnly = false }: AppNavbarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 sm:px-6">
      <div className="relative z-10 flex min-w-0 flex-1 justify-start" aria-hidden={!left}>
        {left}
      </div>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <Link
          to="/"
          className="pointer-events-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
        >
          <NicetuLogo
            showWordmark={!logoIconOnly}
            compact={logoCompact}
            className="size-8"
          />
        </Link>
      </div>
      <div className="relative z-10 flex min-w-0 flex-1 justify-end" aria-hidden={!right}>
        {right}
      </div>
    </header>
  );
}
