"use client";

import { useTranslation } from "@/context/TranslationContext";

export default function Footer() {
  const { t, language } = useTranslation();

  return (
    <footer
      className="bg-blue-900 text-white py-8 text-center"
      dir={language === "en" ? "ltr" : "rtl"}
    >
      <p className="text-lg font-medium">
        {t.footer_text}
      </p>
    </footer>
  );
}
