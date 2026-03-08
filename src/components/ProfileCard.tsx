import { useState } from "react";
import { motion } from "framer-motion";
import { ProfileData } from "@/types/profile";
import { Mail, Phone, Globe, Linkedin, User, Instagram, ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { normalizeLinkedInUrl } from "@/lib/utils";

interface ProfileCardProps {
  profile: ProfileData;
  /** Compact mode: front (photo, name, title, bio) + tap to flip to back (contact). Used on Me page. */
  compact?: boolean;
}

function ContactLinksCompact({ profile }: { profile: ProfileData }) {
  return (
    <div className="space-y-3">
      {profile.email && (
        <motion.a
          href={`mailto:${profile.email}`}
          whileHover={{ x: 5 }}
          className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <Mail className="w-4 h-4 text-primary/70 shrink-0" />
          <span className="font-mono">{profile.email}</span>
        </motion.a>
      )}
      {profile.phone && (
        <motion.a
          href={`tel:${profile.phone}`}
          whileHover={{ x: 5 }}
          className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <Phone className="w-4 h-4 text-primary/70 shrink-0" />
          <span className="font-mono">{profile.phone}</span>
        </motion.a>
      )}
      {profile.website && (
        <motion.a
          href={`https://${profile.website}`}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ x: 5 }}
          className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <Globe className="w-4 h-4 text-primary/70 shrink-0" />
          <span className="font-mono">{profile.website}</span>
        </motion.a>
      )}
      {profile.linkedin && (
        <motion.a
          href={normalizeLinkedInUrl(profile.linkedin)}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ x: 5 }}
          className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <Linkedin className="w-4 h-4 text-primary/70 shrink-0" />
          <span className="font-mono">{profile.linkedin}</span>
        </motion.a>
      )}
      {profile.instagram && (
        <motion.a
          href={profile.instagram.startsWith("http") ? profile.instagram : `https://instagram.com/${profile.instagram.replace(/^@/, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ x: 5 }}
          className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <Instagram className="w-4 h-4 text-primary/70 shrink-0" />
          <span className="font-mono">{profile.instagram}</span>
        </motion.a>
      )}
      {profile.facebook && (
        <motion.a
          href={profile.facebook.startsWith("http") ? profile.facebook : `https://facebook.com/${profile.facebook.replace(/^@/, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ x: 5 }}
          className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <span className="font-mono text-xs text-primary/70">fb</span>
          <span className="font-mono">{profile.facebook}</span>
        </motion.a>
      )}
    </div>
  );
}

export function ProfileCard({ profile, compact = false }: ProfileCardProps) {
  const { t } = useLanguage();
  const [flipped, setFlipped] = useState(false);

  const hasContact = !!(profile.email || profile.phone || profile.website || profile.linkedin || profile.instagram || profile.facebook);

  if (compact && hasContact) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative w-full max-w-md mx-auto"
      >
        <div
          role="button"
          tabIndex={0}
          onClick={() => setFlipped((f) => !f)}
          onKeyDown={(e) => e.key === "Enter" && setFlipped((f) => !f)}
          className="cursor-pointer"
          style={{ perspective: 1000 }}
          aria-label={flipped ? t("cardTapToSeeFront") : t("cardTapToSeeContact")}
        >
          <div
            className="relative w-full min-h-[380px] transition-transform duration-500"
            style={{ transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
          >
            {/* Front: same proportions as skeleton — header, avatar, name, title, bio */}
            <div
              className="absolute inset-0 glass glow-border rounded-2xl overflow-hidden"
              style={{ backfaceVisibility: "hidden", transform: "rotateY(0deg)" }}
            >
              <div className="relative h-24 bg-primary/10">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />
              </div>
              <div className="relative -mt-16 px-6">
                <div className="w-28 h-28 rounded-2xl glass glow-border p-1 mx-auto overflow-hidden">
                  {profile.photoUrl ? (
                    <img src={profile.photoUrl} alt="" className="w-full h-full rounded-xl object-cover" />
                  ) : (
                    <div className="w-full h-full rounded-xl bg-primary/20 flex items-center justify-center">
                      <User className="w-12 h-12 text-primary" />
                    </div>
                  )}
                </div>
              </div>
              <div className="p-6 pt-4 space-y-4">
                <div className="text-center">
                  <h2 className="text-2xl font-bold font-mono glow-text text-foreground">
                    {profile.firstName} {profile.lastName}
                  </h2>
                  <p className="text-primary font-medium mt-1">{profile.title}</p>
                </div>
                <p className="text-muted-foreground text-center text-sm leading-relaxed line-clamp-3">
                  {profile.bio}
                </p>
                <p className="text-muted-foreground/70 text-sm flex items-center justify-center gap-2 pt-2">
                  <ChevronDown className="w-4 h-4 rotate-180" />
                  {t("cardTapToSeeContact")}
                </p>
              </div>
              <div className="h-1 bg-primary/50 rounded-b-2xl" />
            </div>
            {/* Back: contact info — same typography as full card */}
            <div
              className="absolute inset-0 glass glow-border rounded-2xl overflow-hidden"
              style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
            >
              <div className="p-6 space-y-3">
                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-2" />
                <ContactLinksCompact profile={profile} />
                <p className="text-muted-foreground/70 text-sm flex items-center justify-center gap-2 pt-6">
                  <ChevronDown className="w-4 h-4" />
                  {t("cardTapToSeeFront")}
                </p>
              </div>
              <div className="h-1 bg-primary/50 rounded-b-2xl absolute bottom-0 left-0 right-0" />
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative w-full max-w-md mx-auto"
    >
      {/* Main card */}
      <div className="glass glow-border rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="relative h-24 bg-primary/10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />
        </div>

        {/* Avatar */}
        <div className="relative -mt-16 px-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-28 h-28 rounded-2xl glass glow-border p-1 mx-auto"
          >
            {profile.photoUrl ? (
              <img
                src={profile.photoUrl}
                alt={`${profile.firstName} ${profile.lastName}`}
                className="w-full h-full rounded-xl object-cover"
              />
            ) : (
              <div className="w-full h-full rounded-xl bg-primary/20 flex items-center justify-center">
                <User className="w-12 h-12 text-primary" />
              </div>
            )}
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6 pt-4 space-y-4">
          {/* Name and title */}
          <div className="text-center">
            <h1 className="text-2xl font-bold font-mono glow-text text-foreground">
              {profile.firstName} {profile.lastName}
            </h1>
            <p className="text-primary font-medium mt-1">{profile.title}</p>
          </div>

          {/* Bio */}
          <p className="text-muted-foreground text-center text-sm leading-relaxed">
            {profile.bio}
          </p>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          {/* Contact info */}
          <div className="space-y-3">
            {profile.email && (
              <motion.a
                href={`mailto:${profile.email}`}
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4 text-primary/70" />
                <span className="font-mono">{profile.email}</span>
              </motion.a>
            )}
            {profile.phone && (
              <motion.a
                href={`tel:${profile.phone}`}
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4 text-primary/70" />
                <span className="font-mono">{profile.phone}</span>
              </motion.a>
            )}
            {profile.website && (
              <motion.a
                href={`https://${profile.website}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Globe className="w-4 h-4 text-primary/70" />
                <span className="font-mono">{profile.website}</span>
              </motion.a>
            )}
            {profile.linkedin && (
              <motion.a
                href={normalizeLinkedInUrl(profile.linkedin)}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="w-4 h-4 text-primary/70" />
                <span className="font-mono">{profile.linkedin}</span>
              </motion.a>
            )}
            {profile.instagram && (
              <motion.a
                href={profile.instagram.startsWith("http") ? profile.instagram : `https://instagram.com/${profile.instagram.replace(/^@/, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="w-4 h-4 text-primary/70" />
                <span className="font-mono">{profile.instagram}</span>
              </motion.a>
            )}
            {profile.facebook && (
              <motion.a
                href={profile.facebook.startsWith("http") ? profile.facebook : `https://facebook.com/${profile.facebook.replace(/^@/, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <span className="text-primary/70 font-mono text-xs">fb</span>
                <span className="font-mono">{profile.facebook}</span>
              </motion.a>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="h-1 bg-primary/50" />
      </div>
    </motion.div>
  );
}
