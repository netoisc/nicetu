import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { ProfileData, emptyProfile, profileFromAuth, PrimaryChannel } from "@/types/profile";

export function useProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<ProfileData>(emptyProfile);
  const [slug, setSlug] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (data && !error) {
        setSlug(data.slug);
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
      } else {
        setProfile(profileFromAuth(user));
      }
      setLoading(false);
    };

    fetchProfile();
  }, [user]);

  const updateProfile = async (updated: ProfileData) => {
    if (!user) return;
    
    const { error } = await supabase
      .from("profiles")
      .update({
        first_name: updated.firstName,
        last_name: updated.lastName,
        title: updated.title,
        bio: updated.bio,
        photo_url: updated.photoUrl,
        work_preference: updated.workPreference,
        email: updated.email,
        phone: updated.phone,
        website: updated.website,
        linkedin: updated.linkedin,
        instagram: updated.instagram,
        facebook: updated.facebook,
        primary_channel: updated.primaryChannel,
      })
      .eq("user_id", user.id);

    if (!error) {
      setProfile(updated);
      // Re-fetch to get updated slug
      const { data } = await supabase
        .from("profiles")
        .select("slug")
        .eq("user_id", user.id)
        .maybeSingle();
      if (data) setSlug(data.slug);
    }

    return error;
  };

  return { profile, slug, loading, updateProfile };
}
