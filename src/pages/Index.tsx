import { motion } from "framer-motion";
import { ProfileCard } from "@/components/ProfileCard";
import { QRCodeDisplay } from "@/components/QRCodeDisplay";
import { ProfileEditor } from "@/components/ProfileEditor";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { Button } from "@/components/ui/button";
import { NicetuLogo } from "@/components/NicetuLogo";
import { LogOut, Loader2, ArrowRight, QrCode, MessageCircle, Leaf } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function LandingPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="fixed top-6 right-6 z-50">
        <LanguageSwitcher />
      </div>

      {/* Background — subtle grid only, no orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDYwIEwgNjAgNjAgNjAgMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40" />
      </div>

      <main className="relative z-10 w-full max-w-2xl mx-auto text-center flex flex-col items-center gap-12">
        {/* Logo only – no extra pill/border so the mark and wordmark read clearly */}
        <div className="inline-flex items-center justify-center py-2">
          <NicetuLogo compact />
        </div>

        {/* Headline — solid primary, no gradient */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]">
          <span className="text-foreground">{t("heroTitle").split(",")[0]},</span>
          <br />
          <span className="text-primary">
            {t("heroTitle").includes(",") ? t("heroTitle").split(",").slice(1).join(",").trim() : t("heroTitle")}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-muted-foreground/90 max-w-2xl leading-relaxed">
          {t("heroSubtitle")}
        </p>

        {/* CTA */}
        <Button
          size="lg"
          className="font-semibold px-8 py-6 text-base bg-primary text-primary-foreground hover:bg-primary/90 border-0 rounded-xl shadow-md transition-all duration-200 hover:scale-[1.02] flex items-center gap-2"
          onClick={() => navigate("/auth")}
        >
          <span className="flex flex-col items-center leading-tight">
            <span>{t("heroPrimaryCta")}</span>
            <span className="text-xs font-normal opacity-90">{t("heroCtaFree")}</span>
          </span>
          <ArrowRight className="w-5 h-5 ml-1 shrink-0" />
        </Button>

        {/* Card visual */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-xs rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 shadow-2xl shadow-black/20"
        >
          <div className="aspect-square rounded-2xl bg-primary/15 flex items-center justify-center p-4">
            <QrCode className="w-full h-full max-w-[160px] max-h-[160px] min-w-[120px] min-h-[120px] text-primary/70" strokeWidth={1.5} />
          </div>
          <p className="mt-4 text-sm text-muted-foreground/90 font-medium">
            {t("heroTagline")}
          </p>
        </motion.div>

        {/* Use cases carousel */}
        <section className="w-full max-w-2xl">
          <h2 className="text-center text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
            {t("useCaseTitle")}
          </h2>
          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent className="-ml-2 sm:-ml-4">
              <CarouselItem className="pl-2 sm:pl-4 basis-full sm:basis-1/2">
                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 h-full">
                  <MessageCircle className="w-10 h-10 text-primary/70 mb-3" />
                  <p className="text-sm sm:text-base text-muted-foreground/90 leading-relaxed">
                    {t("useCase1")}
                  </p>
                </div>
              </CarouselItem>
              <CarouselItem className="pl-2 sm:pl-4 basis-full sm:basis-1/2">
                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 h-full">
                  <Leaf className="w-10 h-10 text-primary/70 mb-3" />
                  <p className="text-sm sm:text-base text-muted-foreground/90 leading-relaxed">
                    {t("useCase2")}
                  </p>
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="-left-2 sm:-left-12 border-white/20 bg-background/80 hover:bg-background" />
            <CarouselNext className="-right-2 sm:-right-12 border-white/20 bg-background/80 hover:bg-background" />
          </Carousel>
        </section>
      </main>
    </div>
  );
}

const Index = () => {
  const { t } = useLanguage();
  const { user, loading: authLoading, signOut } = useAuth();
  const { profile, slug, loading: profileLoading, updateProfile } = useProfile();

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <LandingPage />;
  }

  if (profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  const handleProfileUpdate = async (updatedProfile: typeof profile) => {
    await updateProfile(updatedProfile);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <LanguageSwitcher />

      {/* Sign out button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed top-4 left-4 z-50"
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={signOut}
          className="font-mono text-xs text-muted-foreground hover:text-destructive"
        >
          <LogOut className="w-4 h-4 mr-2" />
          {t('signOut')}
        </Button>
      </motion.div>

      {/* Background — grid only, no orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDYwIEwgNjAgNjAgNjAgMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40" />
      </div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center mb-12 relative z-10"
      >
        <Link to="/" className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg">
          <NicetuLogo className="size-8" />
        </Link>
      </motion.header>

      {/* Main content */}
      <main className="relative z-10 w-full max-w-4xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
          <ProfileCard profile={profile} />
          <QRCodeDisplay profile={profile} slug={slug} />
        </div>
      </main>

      {/* Profile Editor */}
      <ProfileEditor profile={profile} onSave={handleProfileUpdate} />

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-12 text-center relative z-10"
      >
        <p className="text-xs font-mono text-muted-foreground/50">
          {t('footerHint')}
        </p>
      </motion.footer>
    </div>
  );
};

export default Index;
