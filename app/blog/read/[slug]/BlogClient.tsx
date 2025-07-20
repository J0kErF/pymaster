"use client";

import { useTranslation } from "@/context/TranslationContext";

interface BlogClientProps {
  post: {
    title: Record<string, string>;
    content: Record<string, string>; // HTML content
    author: string;
    createdAt: string;
    tags?: Record<string, string[]>;
  };
}

export default function BlogClient({ post }: BlogClientProps) {
  const { language, t } = useTranslation();

  const title = post.title?.[language] || t["no-title-found"];
  const content = post.content?.[language] || t["no-content-found"];
  const tags = post.tags?.[language] || [];

  return (
    <section
      className="max-w-4xl mx-auto px-4 py-24"
      dir={language === "en" ? "ltr" : "rtl"}
    >
      {/* Title */}
      <h1 className="text-4xl font-bold text-blue-900 mb-4">{title}</h1>

      {/* Author + Date */}
      <p className="text-gray-600 text-sm mb-8">
        {t["by"]}:{" "}
        <span className="font-medium text-gray-800">{post.author}</span> •{" "}
        {new Date(post.createdAt).toLocaleDateString(
          language === "en" ? "en-GB" : "he-IL"
        )}
      </p>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Content */}
      <article
        className="prose prose-blue max-w-none text-lg leading-relaxed"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      {/* Back Button */}
      <div className="mt-16 text-center">
        <a
          href="/blog"
          className="inline-block text-blue-700 hover:underline text-base font-medium"
        >
          ← {t["back_to_blog"]}
        </a>
      </div>
    </section>
  );
}
