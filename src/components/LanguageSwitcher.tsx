import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Language } from '@/i18n/translations';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'EN', flag: '🇺🇸' },
    { code: 'es', label: 'ES', flag: '🇪🇸' },
  ];

  return (
    <div className="fixed top-6 right-6 z-50 flex gap-1 glass glow-border rounded-full p-1">
      {languages.map((lang) => (
        <motion.button
          key={lang.code}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setLanguage(lang.code)}
          className={`px-3 py-1.5 rounded-full text-xs font-mono transition-colors flex items-center gap-1.5 ${
            language === lang.code
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <span>{lang.flag}</span>
          <span>{lang.label}</span>
        </motion.button>
      ))}
    </div>
  );
}
