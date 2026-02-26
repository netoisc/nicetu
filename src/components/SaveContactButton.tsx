import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "@/hooks/use-toast";
import { UserPlus, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SaveContactButtonProps {
  profileId: string;
}

export function SaveContactButton({ profileId }: SaveContactButtonProps) {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!user) {
      navigate("/auth");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from("connections").insert({
        user_id: user.id,
        connected_profile_id: profileId,
      });

      if (error) {
        if (error.code === "23505") {
          toast({ title: t('alreadySaved'), description: t('alreadySavedDesc') });
        } else {
          throw error;
        }
      } else {
        setSaved(true);
        toast({ title: t('contactSaved'), description: t('contactSavedDesc') });
      }
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleSave}
      disabled={loading || saved}
      variant="outline"
      className="w-full font-mono text-sm border-border hover:border-primary hover:text-primary"
    >
      {saved ? (
        <>
          <Check className="w-4 h-4 mr-2" />
          {t('saved')}
        </>
      ) : (
        <>
          <UserPlus className="w-4 h-4 mr-2" />
          {t('saveContact')}
        </>
      )}
    </Button>
  );
}
