import { motion } from "framer-motion";
import { ProfileData } from "@/types/profile";
import { MapPin, Mail, Phone, Globe, Linkedin, User } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProfileCardProps {
  profile: ProfileData;
}

const workPreferenceIcons = {
  remote: "🏠",
  hybrid: "🔄",
  office: "🏢",
  flexible: "✨",
};

export function ProfileCard({ profile }: ProfileCardProps) {
  const { t } = useLanguage();

  const workPreferenceLabels = {
    remote: t('remote'),
    hybrid: t('hybrid'),
    office: t('office'),
    flexible: t('flexible'),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative w-full max-w-md mx-auto"
    >
      {/* Glow effect behind card */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 blur-3xl -z-10 animate-pulse-glow" />
      
      {/* Main card */}
      <div className="glass glow-border rounded-2xl overflow-hidden">
        {/* Scan line effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-scan-line" />
        </div>

        {/* Header with gradient */}
        <div className="relative h-24 bg-gradient-to-br from-primary/20 via-accent/10 to-transparent">
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
              <div className="w-full h-full rounded-xl bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center">
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

          {/* Work preference badge */}
          <div className="flex justify-center">
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-mono"
            >
              <MapPin className="w-4 h-4 text-primary" />
              <span>{workPreferenceIcons[profile.workPreference]}</span>
              <span className="text-muted-foreground">{workPreferenceLabels[profile.workPreference]}</span>
            </motion.span>
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
                href={`https://${profile.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="w-4 h-4 text-primary/70" />
                <span className="font-mono">{profile.linkedin}</span>
              </motion.a>
            )}
          </div>
        </div>

        {/* Footer accent */}
        <div className="h-1 bg-gradient-to-r from-primary via-accent to-primary" />
      </div>
    </motion.div>
  );
}
