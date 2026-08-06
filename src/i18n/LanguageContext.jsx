import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { LANGS, t as translate, translations } from './translations.js';

const LanguageContext = createContext(null);
const STORAGE_KEY = 'bacco-lang';

function detectLang() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved && translations[saved]) return saved;
  const nav = (navigator.language || 'nl').slice(0, 2).toLowerCase();
  if (translations[nav]) return nav;
  return 'nl';
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      return detectLang();
    } catch {
      return 'nl';
    }
  });

  useEffect(() => {
    document.documentElement.lang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  const value = useMemo(
    () => ({
      lang,
      langs: LANGS,
      setLang: setLangState,
      t: (path) => translate(lang, path),
    }),
    [lang]
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
