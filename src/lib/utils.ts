import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Build a valid LinkedIn URL. Accepts username only (e.g. "john-doe") or full URL. */
export function normalizeLinkedInUrl(value: string): string {
  const v = value.trim();
  if (!v) return "";
  if (/^https?:\/\//i.test(v)) return v.replace(/^http:\/\//i, "https://");
  const match = v.match(/linkedin\.com\/in\/([^\/\?#]+)/i);
  if (match) return `https://linkedin.com/in/${match[1]}`;
  const username = v.replace(/^@/, "").replace(/^\//, "");
  return `https://linkedin.com/in/${username}`;
}
