import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ProfileCard } from "@/components/ProfileCard";
import { ProfileData } from "@/types/profile";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { SaveContactButton } from "@/components/SaveContactButton";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Loader2 } from "lucide-react";

export default function PublicCard() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useLanguage();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!slug) return;
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("slug", slug)
        .eq("is_public", true)
        .maybeSingle();

      if (error || !data) {
        setNotFound(true);
      } else {
        setProfile({
          firstName: data.first_name,
          lastName: data.last_name,
          title: data.title,
          bio: data.bio,
          photoUrl: data.photo_url,
          workPreference: data.work_preference as ProfileData["workPreference"],
          email: data.email,
          phone: data.phone,
          website: data.website,
          linkedin: data.linkedin,
        });
      }
      setLoading(false);
    };
    fetchProfile();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (notFound || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="glass glow-border rounded-2xl p-8 text-center">
          <h1 className="text-2xl font-bold font-mono glow-text">{t('profileNotFound')}</h1>
          <p className="text-muted-foreground mt-2 font-mono text-sm">{t('profileNotFoundDesc')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <LanguageSwitcher />

      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDYwIEwgNjAgNjAgNjAgMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDIpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50" />
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        />
      </div>

      <main className="relative z-10 w-full max-w-4xl mx-auto">
        <div className="flex flex-col items-center gap-6">
          <ProfileCard profile={profile} />
          <div className="flex flex-col items-center gap-4 w-full max-w-md">
            <SaveContactButton profile={profile} />
            <Link
              to="/"
              className="text-sm font-mono text-primary hover:text-primary/80 transition-colors text-center"
            >
              {t('createYourQRProfile')}
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
