"use client";

// 🌍 Translation context to support multi-language switching
import { createContext, useContext, useEffect, useState } from "react";
import he from "@/locales/he.json";
import en from "@/locales/en.json";
import ar from "@/locales/ar.json";

type Lang = "he" | "en" | "ar";
type Translations = typeof he;

const translationsMap: Record<Lang, Translations> = { he, en, ar };

interface TranslationContextType {
  t: Translations;
  language: Lang;
  setLanguage: (lang: Lang) => void;
}

export const TranslationContext = createContext<TranslationContextType | null>(null);

export const TranslationProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Lang>("he");

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved && ["he", "en", "ar"].includes(saved)) {
      setLanguage(saved as Lang);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("lang", language);
  }, [language]);

  const value: TranslationContextType = {
    t: translationsMap[language],
    language,
    setLanguage,
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) throw new Error("useTranslation must be used inside TranslationProvider");
  return context;
};
