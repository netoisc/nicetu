import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ProfileCard } from "@/components/ProfileCard";
import { QRCodeDisplay } from "@/components/QRCodeDisplay";
import { ProfileEditor } from "@/components/ProfileEditor";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { Button } from "@/components/ui/button";
import { AppNavbar } from "@/components/AppNavbar";
import { ProfileScreenSkeleton } from "@/components/ProfileScreenSkeleton";
import { PageLoader } from "@/components/PageLoader";
import { LogOut } from "lucide-react";

const GRID_BG =
  "bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDYwIEwgNjAgNjAgNjAgMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40";

function DashboardNavbar({ onSignOut }: { onSignOut: () => void }) {
  const { t } = useLanguage();
  return (
    <AppNavbar
      left={
        <Button
          variant="ghost"
          size="sm"
          onClick={onSignOut}
          className="font-mono text-xs text-muted-foreground hover:text-destructive -ml-2"
          aria-label={t("signOut")}
        >
          <LogOut className="w-4 h-4 sm:mr-2" aria-hidden />
          <span className="hidden sm:inline">{t("signOut")}</span>
        </Button>
      }
      right={<LanguageSwitcher compact />}
      logoIconOnly
    />
  );
}

export default function Me() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { user, loading: authLoading, signOut } = useAuth();
  const { profile, slug, loading: profileLoading, updateProfile } = useProfile();

  useEffect(() => {
    if (!authLoading && !user) navigate("/", { replace: true });
  }, [authLoading, user, navigate]);

  if (authLoading || !user) return <PageLoader />;

  if (profileLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center p-6 relative overflow-hidden">
        <DashboardNavbar onSignOut={signOut} />
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className={`absolute inset-0 ${GRID_BG}`} />
        </div>
        <div className="h-14 shrink-0" />
        <main className="relative z-10 w-full max-w-4xl mx-auto pt-4">
          <ProfileScreenSkeleton />
        </main>
      </div>
    );
  }

  const handleProfileUpdate = async (updatedProfile: typeof profile) => {
    await updateProfile(updatedProfile);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <DashboardNavbar onSignOut={signOut} />
      </motion.div>
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute inset-0 ${GRID_BG}`} />
      </div>
      <div className="h-14 shrink-0" />
      <main className="relative z-10 w-full max-w-4xl mx-auto" aria-label={t("dashboardAriaLabel")}>
        <h1 className="sr-only">{t("dashboardTitle")}</h1>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
          <ProfileCard profile={profile} compact />
          <QRCodeDisplay profile={profile} slug={slug} />
        </div>
      </main>
      <ProfileEditor profile={profile} onSave={handleProfileUpdate} />
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-12 text-center relative z-10"
      >
        <p className="text-xs font-mono text-muted-foreground/50">{t("footerHint")}</p>
      </motion.footer>
    </div>
  );
}
