"use client";

import { useTranslation } from "@/context/TranslationContext";
import Link from "next/link";

export default function BlogSection() {
  const { t, language } = useTranslation();

  return (
    <section
      id="blog"
      className="max-w-7xl mx-auto py-24 px-6 text-center"
      dir={language === "en" ? "ltr" : "rtl"}
    >
      <h2 className="text-4xl font-bold text-blue-900 mb-4">
        {t.blog_title}
      </h2>
      <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
        {t.blog_description}
      </p>
      <Link
        href="/blog"
        className="inline-block bg-blue-800 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition"
      >
        {t.blog_cta}
      </Link>
    </section>
  );
}
