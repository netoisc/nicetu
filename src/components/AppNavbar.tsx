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
 * Centered-logo navbar. Uses absolute positioning so the logo stays
 * truly centered regardless of left/right content width (fixes mobile alignment).
 */
export function AppNavbar({ left, right, logoCompact = true, logoIconOnly = false }: AppNavbarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 sm:px-6">
      <div className="flex flex-1 min-w-0 justify-start" aria-hidden={!left}>
        {left}
      </div>
      <Link
        to="/"
        className="absolute left-1/2 -translate-x-1/2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
      >
        <NicetuLogo
          showWordmark={!logoIconOnly}
          compact={logoCompact}
          className="size-8"
        />
      </Link>
      <div className="flex flex-1 justify-end min-w-0" aria-hidden={!right}>
        {right}
      </div>
    </header>
  );
}
