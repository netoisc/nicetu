import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "@/hooks/use-toast";
import { UserPlus, Check } from "lucide-react";
import { ProfileData } from "@/types/profile";
import { useState } from "react";

interface SaveContactButtonProps {
  profile: ProfileData;
}

function isAndroid(): boolean {
  if (typeof navigator === "undefined") return false;
  return /Android/i.test(navigator.userAgent);
}

/** Android intent URL: opens native "Add contact" screen with fields prefilled. One tap → Save. */
function buildAndroidAddContactIntent(profile: ProfileData): string {
  const name = [profile.firstName, profile.lastName].filter(Boolean).join(" ").trim() || "Contact";
  const parts = [
    "intent:#Intent",
    "action=android.intent.action.INSERT",
    "type=vnd.android.cursor.dir/raw_contact",
    `S.name=${encodeURIComponent(name)}`,
  ];
  if (profile.phone) parts.push(`S.phone=${encodeURIComponent(profile.phone)}`);
  if (profile.email) parts.push(`S.email=${encodeURIComponent(profile.email)}`);
  parts.push("end");
  return parts.join(";");
}

function buildVCard(profile: ProfileData): string {
  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${profile.firstName} ${profile.lastName}`,
    `N:${profile.lastName};${profile.firstName};;;`,
    profile.title ? `TITLE:${profile.title}` : "",
    profile.email ? `EMAIL:${profile.email}` : "",
    profile.phone ? `TEL:${profile.phone}` : "",
    profile.website ? `URL:${profile.website.startsWith("http") ? profile.website : `https://${profile.website}`}` : "",
    profile.linkedin ? `URL:${profile.linkedin.startsWith("http") ? profile.linkedin : `https://${profile.linkedin}`}` : "",
    profile.bio ? `NOTE:${profile.bio.replace(/\n/g, "\\n")}` : "",
    "END:VCARD",
  ]
    .filter(Boolean)
    .join("\r\n");
  return vcard;
}

function downloadVCard(profile: ProfileData): void {
  const vcard = buildVCard(profile);
  const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${profile.firstName}_${profile.lastName}.vcf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function SaveContactButton({ profile }: SaveContactButtonProps) {
  const { t } = useLanguage();
  const [saved, setSaved] = useState(false);
  const useAndroidIntent = isAndroid();

  const handleSave = () => {
    if (useAndroidIntent) {
      const intentUrl = buildAndroidAddContactIntent(profile);
      window.location.href = intentUrl;
      setSaved(true);
      toast({
        title: t("contactSaved"),
        description: t("addContactAndroidDesc"),
      });
    } else {
      downloadVCard(profile);
      setSaved(true);
      toast({
        title: t("contactSaved"),
        description: t("contactSavedToPhoneDesc"),
      });
    }
  };

  // On Android: use a link so the intent is triggered by user gesture (required by Chrome).
  // Opens native "Add contact" screen with name/phone/email prefilled — one tap, then Save.
  if (useAndroidIntent) {
    const intentUrl = buildAndroidAddContactIntent(profile);
    return (
      <Button
        variant="outline"
        className="w-full font-mono text-sm border-border hover:border-primary hover:text-primary"
        asChild
      >
        <a
          href={intentUrl}
          onClick={() =>
            toast({ title: t("contactSaved"), description: t("addContactAndroidDesc") })
          }
        >
          <UserPlus className="w-4 h-4 mr-2" />
          {t("saveContact")}
        </a>
      </Button>
    );
  }

  return (
    <Button
      onClick={handleSave}
      variant="outline"
      className="w-full font-mono text-sm border-border hover:border-primary hover:text-primary"
    >
      {saved ? (
        <>
          <Check className="w-4 h-4 mr-2" />
          {t("saved")}
        </>
      ) : (
        <>
          <UserPlus className="w-4 h-4 mr-2" />
          {t("saveContact")}
        </>
      )}
    </Button>
  );
}
