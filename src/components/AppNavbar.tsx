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
 * Centered-logo navbar. Three equal columns: left | center (logo) | right.
 * Logo is centered in the middle column, so it stays centered in the viewport.
 */
export function AppNavbar({ left, right, logoCompact = true, logoIconOnly = false }: AppNavbarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 grid grid-cols-3 items-center px-4 py-3 sm:px-6">
      <div className="flex justify-start min-w-0" aria-hidden={!left}>
        {left}
      </div>
      <div className="flex justify-center min-w-0">
        <Link to="/" className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg shrink-0">
          <NicetuLogo
            showWordmark={!logoIconOnly}
            compact={logoCompact}
            className="size-8"
          />
        </Link>
      </div>
      <div className="flex justify-end min-w-0" aria-hidden={!right}>
        {right}
      </div>
    </header>
  );
}
