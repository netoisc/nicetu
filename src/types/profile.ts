export interface ProfileData {
  firstName: string;
  lastName: string;
  profession: string;
  bio: string;
  photoUrl: string;
  workPreference: 'remote' | 'hybrid' | 'office' | 'flexible';
  email: string;
  phone: string;
  website: string;
  linkedin: string;
}

export const defaultProfile: ProfileData = {
  firstName: "Alex",
  lastName: "Chen",
  profession: "Full Stack Developer",
  bio: "Building the future, one line of code at a time. Passionate about clean architecture and innovative solutions.",
  photoUrl: "",
  workPreference: "hybrid",
  email: "alex@example.com",
  phone: "+1 (555) 123-4567",
  website: "alexchen.dev",
  linkedin: "linkedin.com/in/alexchen",
};
