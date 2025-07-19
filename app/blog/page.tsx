"use client";

import { useTranslation } from "@/context/TranslationContext";

export default function BlogPage() {
  const { t, language } = useTranslation();

  return (
    <section
      className="max-w-6xl mx-auto px-6 py-24"
      dir={language === "en" ? "ltr" : "rtl"}
    >
      <h1 className="text-5xl font-bold text-blue-900 text-center mb-12">
        {t.blog_title}
      </h1>
      <p className="text-center text-lg text-gray-600 mb-12">
        {t.blog_intro}
      </p>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Post 1 */}
        <article className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-xl font-bold text-blue-800 mb-2">
            {t.blog_post_1_title}
          </h2>
          <p className="text-sm text-gray-600 mb-4">{t.blog_post_1_desc}</p>
          <a href="#" className="text-blue-700 hover:underline font-medium">
            {t.blog_read_more}
          </a>
        </article>

        {/* Post 2 */}
        <article className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-xl font-bold text-blue-800 mb-2">
            {t.blog_post_2_title}
          </h2>
          <p className="text-sm text-gray-600 mb-4">{t.blog_post_2_desc}</p>
          <a href="#" className="text-blue-700 hover:underline font-medium">
            {t.blog_read_more}
          </a>
        </article>

        {/* Post 3 */}
        <article className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-xl font-bold text-blue-800 mb-2">
            {t.blog_post_3_title}
          </h2>
          <p className="text-sm text-gray-600 mb-4">{t.blog_post_3_desc}</p>
          <a href="#" className="text-blue-700 hover:underline font-medium">
            {t.blog_read_more}
          </a>
        </article>
      </div>

      <div className="text-center mt-16">
        <a
          href="/"
          className="text-blue-800 text-lg font-semibold hover:underline"
        >
          {t.back_to_home}
        </a>
      </div>
    </section>
  );
}
