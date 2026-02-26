import { QRCodeSVG } from "qrcode.react";
import { motion } from "framer-motion";
import { ProfileData } from "@/types/profile";
import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

interface QRCodeDisplayProps {
  profile: ProfileData;
  slug?: string | null;
}

export function QRCodeDisplay({ profile, slug }: QRCodeDisplayProps) {
  const { t } = useLanguage();

  // If slug exists, QR links to public card page; otherwise use vCard
  const getQrData = () => {
    if (slug) {
      return `${window.location.origin}/card/${slug}`;
    }
    return `BEGIN:VCARD
VERSION:3.0
FN:${profile.firstName} ${profile.lastName}
N:${profile.lastName};${profile.firstName};;;
TITLE:${profile.title}
EMAIL:${profile.email}
TEL:${profile.phone}
URL:${profile.website ? `https://${profile.website}` : ''}
NOTE:${profile.bio}
END:VCARD`;
  };

  const qrData = getQrData();

  const handleShare = async () => {
    const shareUrl = slug ? `${window.location.origin}/card/${slug}` : window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${profile.firstName} ${profile.lastName} - Contact`,
          text: `Contact information for ${profile.firstName} ${profile.lastName}, ${profile.title}`,
          url: shareUrl,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Link Copied",
        description: "Profile link copied to clipboard.",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
      className="w-full max-w-xs mx-auto"
    >
      <div className="glass glow-border rounded-2xl p-6 space-y-4">
        <h3 className="text-center font-mono text-sm text-muted-foreground uppercase tracking-wider">
          {t('scanToConnect')}
        </h3>
        
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="relative p-4 bg-foreground rounded-xl"
        >
          <QRCodeSVG
            id="qr-code-svg"
            value={qrData}
            size={200}
            level="M"
            bgColor="hsl(180, 100%, 95%)"
            fgColor="hsl(220, 20%, 4%)"
            className="w-full h-auto"
          />
          
          <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-primary rounded-tl" />
          <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-primary rounded-tr" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-primary rounded-bl" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-primary rounded-br" />
        </motion.div>

        <Button
          variant="outline"
          size="sm"
          className="w-full font-mono text-xs border-border hover:border-primary hover:text-primary"
          onClick={handleShare}
        >
          <Share2 className="w-4 h-4 mr-2" />
          {t('shareVCard')}
        </Button>
      </div>
    </motion.div>
  );
}
