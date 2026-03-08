-- Transliterate Latin characters (including Latin America: accents, ñ, ü) to ASCII
-- so slugs are readable and URL-safe: "José García" → "jose-garcia", "Muñoz" → "munoz"
CREATE OR REPLACE FUNCTION public.generate_profile_slug()
RETURNS TRIGGER AS $$
DECLARE
  base_slug TEXT;
  final_slug TEXT;
  counter INT := 0;
  raw_name TEXT;
BEGIN
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    raw_name := trim(NEW.first_name || '-' || NEW.last_name);
    raw_name := lower(raw_name);

    -- Transliterate accented and special chars (Latin America / Spanish / Portuguese)
    raw_name := translate(raw_name,
      'áàâäãåéèêëíìîïóòôöõúùûüñçýÿœ',
      'aaaaaaeeeeiiiiooooouuuuncyyo');
    raw_name := replace(raw_name, 'ß', 'ss');

    -- Keep only letters, digits, hyphens; collapse and trim hyphens
    base_slug := regexp_replace(raw_name, '[^a-z0-9-]', '-', 'g');
    base_slug := regexp_replace(base_slug, '-+', '-', 'g');
    base_slug := trim(both '-' from base_slug);

    IF base_slug = '' OR base_slug = '-' THEN
      base_slug := 'user';
    END IF;

    final_slug := base_slug;
    LOOP
      EXIT WHEN NOT EXISTS (SELECT 1 FROM public.profiles WHERE slug = final_slug AND id != NEW.id);
      counter := counter + 1;
      final_slug := base_slug || '-' || counter;
    END LOOP;
    NEW.slug := final_slug;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;
