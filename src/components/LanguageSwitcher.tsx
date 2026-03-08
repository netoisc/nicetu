import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Language } from '@/i18n/translations';

interface LanguageSwitcherProps {
  /** If true, shows only flags (compact for navbar). Default: true. */
  compact?: boolean;
}

export function LanguageSwitcher({ compact = true }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'EN', flag: '🇺🇸' },
    { code: 'es', label: 'ES', flag: '🇲🇽' },
  ];

  return (
    <div className="flex gap-1 glass glow-border rounded-full p-1 shrink-0">
      {languages.map((lang) => (
        <motion.button
          key={lang.code}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setLanguage(lang.code)}
          title={lang.label}
          className={`rounded-full text-xs font-mono transition-colors flex items-center ${
            compact ? 'p-1.5' : 'px-3 py-1.5 gap-1.5'
          } ${
            language === lang.code
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <span>{lang.flag}</span>
          {!compact && <span>{lang.label}</span>}
        </motion.button>
      ))}
    </div>
  );
}
