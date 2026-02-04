import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProfileData } from "@/types/profile";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pencil, X, Save, User } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProfileEditorProps {
  profile: ProfileData;
  onSave: (profile: ProfileData) => void;
}

export function ProfileEditor({ profile, onSave }: ProfileEditorProps) {
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ProfileData>(profile);

  const handleChange = (field: keyof ProfileData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(formData);
    setIsEditing(false);
    toast({
      title: t('profileUpdated'),
      description: t('changesSaved'),
    });
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange("photoUrl", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      {/* Edit toggle button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsEditing(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full glass glow-border flex items-center justify-center text-primary hover:text-foreground transition-colors"
      >
        <Pencil className="w-5 h-5" />
      </motion.button>

      {/* Editor modal */}
      <AnimatePresence>
        {isEditing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-lg max-h-[90vh] overflow-y-auto glass glow-border rounded-2xl p-6"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold font-mono glow-text">{t('editProfile')}</h2>
                <button
                  onClick={handleCancel}
                  className="p-2 rounded-lg hover:bg-secondary transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form */}
              <div className="space-y-5">
                {/* Photo upload */}
                <div className="flex justify-center">
                  <label className="cursor-pointer group">
                    <div className="w-24 h-24 rounded-xl glass glow-border p-1 group-hover:border-primary transition-colors">
                      {formData.photoUrl ? (
                        <img
                          src={formData.photoUrl}
                          alt="Profile"
                          className="w-full h-full rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-full h-full rounded-lg bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center">
                          <User className="w-8 h-8 text-primary" />
                        </div>
                      )}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="hidden"
                    />
                    <p className="text-xs text-center mt-2 text-muted-foreground">
                      {t('clickToUpload')}
                    </p>
                  </label>
                </div>

                {/* Name fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-xs font-mono uppercase text-muted-foreground">
                      {t('firstName')}
                    </Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleChange("firstName", e.target.value)}
                      className="bg-input border-border focus:border-primary font-mono"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-xs font-mono uppercase text-muted-foreground">
                      {t('lastName')}
                    </Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleChange("lastName", e.target.value)}
                      className="bg-input border-border focus:border-primary font-mono"
                    />
                  </div>
                </div>

                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-xs font-mono uppercase text-muted-foreground">
                    {t('title')}
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    className="bg-input border-border focus:border-primary font-mono"
                  />
                </div>

                {/* Bio */}
                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-xs font-mono uppercase text-muted-foreground">
                    {t('bioSummary')}
                  </Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => handleChange("bio", e.target.value)}
                    rows={3}
                    className="bg-input border-border focus:border-primary font-mono resize-none"
                  />
                </div>

                {/* Work preference */}
                <div className="space-y-2">
                  <Label className="text-xs font-mono uppercase text-muted-foreground">
                    {t('workPreference')}
                  </Label>
                  <Select
                    value={formData.workPreference}
                    onValueChange={(value) => handleChange("workPreference", value)}
                  >
                    <SelectTrigger className="bg-input border-border focus:border-primary font-mono">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="glass border-border">
                      <SelectItem value="remote">🏠 {t('remote')}</SelectItem>
                      <SelectItem value="hybrid">🔄 {t('hybrid')}</SelectItem>
                      <SelectItem value="office">🏢 {t('office')}</SelectItem>
                      <SelectItem value="flexible">✨ {t('flexible')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Contact fields */}
                <div className="space-y-4">
                  <h3 className="text-xs font-mono uppercase text-muted-foreground border-b border-border pb-2">
                    {t('contactInformation')}
                  </h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs font-mono uppercase text-muted-foreground">
                      {t('email')}
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className="bg-input border-border focus:border-primary font-mono"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-xs font-mono uppercase text-muted-foreground">
                      {t('phone')}
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      className="bg-input border-border focus:border-primary font-mono"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website" className="text-xs font-mono uppercase text-muted-foreground">
                      {t('website')}
                    </Label>
                    <Input
                      id="website"
                      value={formData.website}
                      onChange={(e) => handleChange("website", e.target.value)}
                      placeholder="yoursite.com"
                      className="bg-input border-border focus:border-primary font-mono"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="linkedin" className="text-xs font-mono uppercase text-muted-foreground">
                      {t('linkedin')}
                    </Label>
                    <Input
                      id="linkedin"
                      value={formData.linkedin}
                      onChange={(e) => handleChange("linkedin", e.target.value)}
                      placeholder="linkedin.com/in/yourname"
                      className="bg-input border-border focus:border-primary font-mono"
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    className="flex-1 border-border hover:border-destructive hover:text-destructive"
                  >
                    {t('cancel')}
                  </Button>
                  <Button
                    onClick={handleSave}
                    className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {t('saveChanges')}
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
