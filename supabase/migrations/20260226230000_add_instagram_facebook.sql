-- Add Instagram and Facebook to profiles
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS instagram TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS facebook TEXT NOT NULL DEFAULT '';

