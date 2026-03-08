import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { NicetuLogo } from "@/components/NicetuLogo";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted pt-20">
      <nav className="fixed top-0 left-0 right-0 z-50 grid grid-cols-[1fr_auto_1fr] items-center px-4 py-3 sm:px-6 bg-muted/80 backdrop-blur-sm">
        <div className="min-w-0" />
        <Link to="/" className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg justify-self-center">
          <NicetuLogo className="size-8" />
        </Link>
        <div className="min-w-0" />
      </nav>
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <Link to="/" className="text-primary underline hover:text-primary/90">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
