import { QRCodeSVG } from "qrcode.react";
import { motion } from "framer-motion";
import { ProfileData } from "@/types/profile";
import { Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface QRCodeDisplayProps {
  profile: ProfileData;
}

export function QRCodeDisplay({ profile }: QRCodeDisplayProps) {
  // Generate vCard data
  const generateVCard = () => {
    return `BEGIN:VCARD
VERSION:3.0
FN:${profile.firstName} ${profile.lastName}
N:${profile.lastName};${profile.firstName};;;
TITLE:${profile.profession}
EMAIL:${profile.email}
TEL:${profile.phone}
URL:${profile.website ? `https://${profile.website}` : ''}
NOTE:${profile.bio}
END:VCARD`;
  };

  const qrData = generateVCard();

  const handleDownload = () => {
    const svg = document.getElementById("qr-code-svg");
    if (!svg) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const svgData = new XMLSerializer().serializeToString(svg);
    const img = new Image();
    
    canvas.width = 512;
    canvas.height = 512;

    img.onload = () => {
      if (ctx) {
        ctx.fillStyle = "#0a0f14";
        ctx.fillRect(0, 0, 512, 512);
        ctx.drawImage(img, 56, 56, 400, 400);
        
        const link = document.createElement("a");
        link.download = `${profile.firstName}_${profile.lastName}_QR.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
        
        toast({
          title: "QR Code Downloaded",
          description: "Your contact QR code has been saved.",
        });
      }
    };

    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${profile.firstName} ${profile.lastName} - Contact`,
          text: `Contact information for ${profile.firstName} ${profile.lastName}, ${profile.profession}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
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
          Scan to Connect
        </h3>
        
        {/* QR Code */}
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
          
          {/* Corner accents */}
          <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-primary rounded-tl" />
          <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-primary rounded-tr" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-primary rounded-bl" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-primary rounded-br" />
        </motion.div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 font-mono text-xs border-border hover:border-primary hover:text-primary"
            onClick={handleDownload}
          >
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 font-mono text-xs border-border hover:border-primary hover:text-primary"
            onClick={handleShare}
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
