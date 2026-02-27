-- Add primary_channel to profiles: main way people contact you
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS primary_channel TEXT NOT NULL DEFAULT 'whatsapp'
  CHECK (primary_channel IN ('whatsapp', 'call', 'email', 'instagram', 'linkedin', 'website'));

