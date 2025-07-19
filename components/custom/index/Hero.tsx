"use client";

import { useTranslation } from "@/context/TranslationContext";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section id="about" className="text-center py-32 px-6 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-extrabold text-blue-900 mb-6 leading-tight">
          {t.hero_title}
        </h1>
        <p className="text-lg text-gray-700 leading-relaxed">
          {t.hero_subtitle}
        </p>
      </div>
    </section>
  );
}
