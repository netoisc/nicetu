import { motion } from "framer-motion";
import { AppNavbar } from "@/components/AppNavbar";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { ArrowRight, QrCode, MessageCircle, Leaf, Link2 } from "lucide-react";
import { PageLoader } from "@/components/PageLoader";
import { useEffect } from "react";
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
      <AppNavbar left={null} right={<LanguageSwitcher compact />} logoCompact />

      {/* Background — subtle grid only, no orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDYwIEwgNjAgNjAgNjAgMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40" />
      </div>

      <div className="h-14 shrink-0" />
      <main className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center gap-12 px-0 text-center">
        {/* Headline — solid primary, no gradient; explicit text-center for Safari */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] text-center w-full">
          <span className="text-foreground">{t("heroTitle").split(",")[0]},</span>
          <br />
          <span className="text-primary">
            {t("heroTitle").includes(",") ? t("heroTitle").split(",").slice(1).join(",").trim() : t("heroTitle")}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-muted-foreground/90 max-w-2xl leading-relaxed text-center w-full">
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
              <CarouselItem className="pl-2 sm:pl-4 basis-full sm:basis-1/2">
                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 h-full">
                  <Link2 className="w-10 h-10 text-primary/70 mb-3" />
                  <p className="text-sm sm:text-base text-muted-foreground/90 leading-relaxed">
                    {t("useCase3")}
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
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && user) navigate("/me", { replace: true });
  }, [authLoading, user, navigate]);

  // Show loader while checking auth or while redirecting (no blank flash)
  if (authLoading || user) return <PageLoader />;

  return <LandingPage />;
};

export default Index;
