import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ProfileCard } from "@/components/ProfileCard";
import { ProfileData, PrimaryChannel } from "@/types/profile";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { SaveContactButton } from "@/components/SaveContactButton";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Loader2, Phone, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

/** WhatsApp link: wa.me/ + phone digits only (with country code) */
function whatsAppUrl(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits}`;
}

function normalizeSocialUrl(value: string, baseUrl: string): string {
  const v = value.trim();
  if (!v) return "";
  if (/^https?:\/\//i.test(v)) return v;
  return `${baseUrl}${v.replace(/^@/, "")}`;
}

function buildPrimaryCtas(profile: ProfileData) {
  const items: { key: string; show: boolean; href: string; labelKey: string; icon: JSX.Element }[] = [];

  if (profile.phone) {
    items.push({
      key: "whatsapp",
      show: true,
      href: whatsAppUrl(profile.phone),
      labelKey: "whatsApp",
      icon: <MessageCircle className="w-4 h-4 mr-2" />,
    });
    items.push({
      key: "call",
      show: true,
      href: `tel:${profile.phone}`,
      labelKey: "call",
      icon: <Phone className="w-4 h-4 mr-2" />,
    });
  }
  if (profile.email) {
    items.push({
      key: "email",
      show: true,
      href: `mailto:${profile.email}`,
      labelKey: "email",
      icon: <Mail className="w-4 h-4 mr-2" />,
    });
  }

  return items;
}

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
          firstName: data.first_name || "",
          lastName: data.last_name || "",
          title: data.title || "",
          bio: data.bio || "",
          photoUrl: data.photo_url || "",
          workPreference: (data.work_preference as ProfileData["workPreference"]) || "flexible",
          email: data.email || "",
          phone: data.phone || "",
          website: data.website || "",
          linkedin: data.linkedin || "",
          instagram: data.instagram ?? "",
          facebook: data.facebook ?? "",
          primaryChannel: (data.primary_channel as PrimaryChannel) || "whatsapp",
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
          {/* Main links to get in touch: primary channel first, then other basics */}
          <div className="flex flex-wrap justify-center gap-3 w-full max-w-md">
            {(() => {
              const ctas = buildPrimaryCtas(profile);
              const primary = ctas.find((c) => c.key === profile.primaryChannel) ?? ctas[0];
              if (!primary) return null;
              const secondary = ctas.filter((c) => c.key !== primary.key);
              return (
                <>
                  <Button
                    asChild
                    size="lg"
                    className="flex-1 min-w-[160px] font-mono bg-[#25D366] text-white hover:bg-[#20bd5a] border-0"
                  >
                    <a href={primary.href} target="_blank" rel="noopener noreferrer">
                      {primary.icon}
                      {t(primary.labelKey as any)}
                    </a>
                  </Button>
                  {secondary.map((cta) => (
                    <Button
                      key={cta.key}
                      asChild
                      size="lg"
                      variant="outline"
                      className="flex-1 min-w-[120px] font-mono border-border hover:border-primary hover:text-primary"
                    >
                      <a href={cta.href}>
                        {cta.icon}
                        {t(cta.labelKey as any)}
                      </a>
                    </Button>
                  ))}
                </>
              );
            })()}
          </div>
          {/* Social: Instagram, Facebook, LinkedIn, website — see their pages */}
          {(profile.instagram || profile.facebook || profile.linkedin || profile.website) && (
            <div className="flex flex-wrap justify-center gap-2 w-full max-w-md">
              {profile.instagram && (
                <Button asChild size="sm" variant="ghost" className="font-mono text-muted-foreground hover:text-primary">
                  <a href={normalizeSocialUrl(profile.instagram, "https://instagram.com/")} target="_blank" rel="noopener noreferrer">
                    {t("instagram")}
                  </a>
                </Button>
              )}
              {profile.facebook && (
                <Button asChild size="sm" variant="ghost" className="font-mono text-muted-foreground hover:text-primary">
                  <a href={normalizeSocialUrl(profile.facebook, "https://facebook.com/")} target="_blank" rel="noopener noreferrer">
                    {t("facebook")}
                  </a>
                </Button>
              )}
              {profile.linkedin && (
                <Button asChild size="sm" variant="ghost" className="font-mono text-muted-foreground hover:text-primary">
                  <a href={profile.linkedin.startsWith("http") ? profile.linkedin : `https://${profile.linkedin}`} target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                </Button>
              )}
              {profile.website && (
                <Button asChild size="sm" variant="ghost" className="font-mono text-muted-foreground hover:text-primary">
                  <a href={profile.website.startsWith("http") ? profile.website : `https://${profile.website}`} target="_blank" rel="noopener noreferrer">
                    {t("website")}
                  </a>
                </Button>
              )}
            </div>
          )}
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
