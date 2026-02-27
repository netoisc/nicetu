export type PrimaryChannel = 'whatsapp' | 'call' | 'email' | 'instagram' | 'linkedin' | 'website';

export interface ProfileData {
  firstName: string;
  lastName: string;
  title: string;
  bio: string;
  photoUrl: string;
  workPreference: 'remote' | 'hybrid' | 'office' | 'flexible';
  email: string;
  phone: string;
  website: string;
  linkedin: string;
  instagram: string;
  facebook: string;
  primaryChannel: PrimaryChannel;
}

/** Empty profile for new users (no placeholder data) */
export const emptyProfile: ProfileData = {
  firstName: "",
  lastName: "",
  title: "",
  bio: "",
  photoUrl: "",
  workPreference: "flexible",
  email: "",
  phone: "",
  website: "",
  linkedin: "",
  instagram: "",
  facebook: "",
  primaryChannel: "whatsapp",
};

/** Build profile from auth user metadata (fallback when no DB profile) */
export function profileFromAuth(user: { user_metadata?: Record<string, unknown>; email?: string }): ProfileData {
  const meta = user?.user_metadata || {};
  const fullName = (meta.full_name as string) || (meta.name as string) || "";
  const parts = fullName.trim().split(/\s+/);
  const firstName = parts[0] || "";
  const lastName = parts.slice(1).join(" ") || "";
  return {
    ...emptyProfile,
    firstName,
    lastName,
    email: user?.email || "",
  };
}
