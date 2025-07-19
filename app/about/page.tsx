"use client";

import { useTranslation } from "@/context/TranslationContext";
import Link from "next/link";

export default function AboutPage() {
  const { t, language } = useTranslation();

  return (
    <section
      className="max-w-5xl mx-auto px-6 py-24"
      dir={language === "en" ? "ltr" : "rtl"}
    >
      <h1 className="text-5xl font-bold text-blue-900 text-center mb-12">
        {t.about_title}
      </h1>

      <p className="text-lg leading-relaxed mb-6">{t.about_paragraph_1}</p>
      <p className="text-lg leading-relaxed mb-6">{t.about_paragraph_2}</p>
      <p className="text-lg leading-relaxed mb-6">{t.about_paragraph_3}</p>
      <p className="text-lg leading-relaxed mb-6">{t.about_paragraph_4}</p>

      <div className="mt-12 text-center">
        <Link
          href="/"
          className="text-blue-800 text-lg font-semibold hover:underline"
        >
          {t.back_to_home}
        </Link>
      </div>
    </section>
  );
}
