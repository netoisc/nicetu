import { Link } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { motion } from "framer-motion";
import { ProfileData } from "@/types/profile";
import { Eye, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
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

  const handleDownload = () => {
    const svg = document.getElementById("qr-code-svg");
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const png = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = png;
      link.download = `${profile.firstName}_${profile.lastName}_qr.png`;
      link.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
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

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 font-mono text-xs border-border hover:border-primary hover:text-primary"
            onClick={handleDownload}
          >
            <Download className="w-4 h-4 mr-2" />
            {t("downloadQR")}
          </Button>
          {slug && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1 font-mono text-xs border-border hover:border-primary hover:text-primary"
              asChild
            >
              <Link to={`/card/${slug}`} target="_blank" rel="noopener noreferrer" title={t("previewYourCard")}>
                <Eye className="w-4 h-4 mr-2" />
                {t("previewYourCard")}
              </Link>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
